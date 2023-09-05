const puppeteer = require("puppeteer");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// Example array of URLs

const urls = [
  "https://biletinial.com/tr-tr/tiyatro/zengin-mutfagi-",
  "https://biletinial.com/tr-tr/tiyatro/iki-korenin-birlesmesi-moda",
  "https://biletinial.com/tr-tr/tiyatro/gokhan-unver",
  "https://biletinial.com/tr-tr/tiyatro/bir-baba-hamlet",
  "https://biletinial.com/tr-tr/tiyatro/sut-kardesler",
  "https://biletinial.com/tr-tr/tiyatro/eksi-bir-kto",
  "https://biletinial.com/tr-tr/tiyatro/etik-alkol-bu-tytr",
  "https://biletinial.com/tr-tr/tiyatro/ilkergumusoluk-tekkisilikgosteri",
  "https://biletinial.com/tr-tr/tiyatro/emre-turhan-sinav-gecesi",
  "https://biletinial.com/tr-tr/tiyatro/ask-hikayen-dusmus",
  "https://biletinial.com/tr-tr/tiyatro/sirreti-evcillestirmek",
  "https://biletinial.com/tr-tr/tiyatro/bulent-beyin-hikayesi-fay",
  "https://biletinial.com/tr-tr/tiyatro/mahseri-cumbus-sanart",
  "https://biletinial.com/tr-tr/tiyatro/yasamaya-dair-aysa-org",
  "https://biletinial.com/tr-tr/tiyatro/nilgun-belgun-ask-ve-komedi-epizot-tytr",
  "https://biletinial.com/tr-tr/tiyatro/hangisi-karisi-epizot",
  "https://biletinial.com/tr-tr/tiyatro/shirley-valetine-ozkyorg",
  "https://biletinial.com/tr-tr/tiyatro/ali-poyrazoglu-singir-singir-beyoglu",
  "https://biletinial.com/tr-tr/tiyatro/firat-tanis-ile-gelin-tanis-olalim-donkisot",
  "https://biletinial.com/tr-tr/tiyatro/ozgur-turhan",
  "https://biletinial.com/tr-tr/tiyatro/yasamaya-dair-fskhne",
  "https://biletinial.com/tr-tr/tiyatro/butun-cilginlar-sever-beni",
  "https://biletinial.com/tr-tr/tiyatro/kim-bu-ben-fskhne",
  "https://biletinial.com/tr-tr/tiyatro/taximm",
  "https://biletinial.com/tr-tr/tiyatro/kaltin-podcasti",
  "https://biletinial.com/tr-tr/tiyatro/barbaros-sansal-terzi-yamagi-konusuyor-burda-olmaz",
  "https://biletinial.com/tr-tr/tiyatro/agaclar-ayakta-olur-tykr",
  "https://biletinial.com/tr-tr/tiyatro/kolsuz-tisort-tytr-klck",
  "https://biletinial.com/tr-tr/tiyatro/yunus-gunce-butik-unlu",
  "https://biletinial.com/tr-tr/tiyatro/armagan-caglayan-ile-size-anlatacaklarim-var",
  "https://biletinial.com/tr-tr/tiyatro/mufit-can-sacinti-itiraz-ediyorum-es",
  "https://biletinial.com/tr-tr/tiyatro/haydaa-mhmt-myda-kiraz",
  "https://biletinial.com/tr-tr/tiyatro/sevimli-sakar-kurt-onuncu",
  "https://biletinial.com/tr-tr/tiyatro/ceviz-adam-muzikali",
  "https://biletinial.com/tr-tr/tiyatro/ali-babanin-ciftligi-ornd",
  "https://biletinial.com/tr-tr/tiyatro/charlienin-cikolata-fabrikasinda-basamak-tyrt",
  "https://biletinial.com/tr-tr/tiyatro/karagoz-bekci-bursa-ks",
  "https://biletinial.com/tr-tr/tiyatro/masa-ile-koca-ayi-dostlugun-gucu",
  "https://biletinial.com/tr-tr/tiyatro/kucuk-kara-balik-bkt",
  "https://biletinial.com/tr-tr/tiyatro/buyuyunce-ne-olacagim",
  "https://biletinial.com/tr-tr/tiyatro/tembel-ayi-dogo-td",
  "https://biletinial.com/tr-tr/tiyatro/kahraman-patiler",
  "https://biletinial.com/tr-tr/tiyatro/bir-delinin-hd-doruk-tytr",
  "https://biletinial.com/tr-tr/tiyatro/karlar-ulkesi-ays",
  "https://biletinial.com/tr-tr/tiyatro/english-standup-comedy-open-mic-inifiti",
  "https://biletinial.com/tr-tr/tiyatro/kadikoy-stand-up-dark-night",
  "https://biletinial.com/tr-tr/tiyatro/kadikoy-stand-up-gecesi-infiniti",
  "https://biletinial.com/tr-tr/tiyatro/6-solo-cagdas-dans-festivali-6th-solo-contemporary-dance-festival",
  "https://biletinial.com/tr-tr/tiyatro/yeraltindan-notlar-ays",
  "https://biletinial.com/tr-tr/tiyatro/bir-delinin-hatira-defteri",
  "https://biletinial.com/tr-tr/tiyatro/kukuli-bakkal-amca-muzikali",
  "https://biletinial.com/tr-tr/tiyatro/haybeden-gercekustu-ask",
  "https://biletinial.com/tr-tr/tiyatro/vera-veya-nihilistler",
  "https://biletinial.com/tr-tr/tiyatro/dogacla-bizimle-karyatid",
  "https://biletinial.com/tr-tr/tiyatro/aysegul-frame-fatih-bayrakcil-kadikoy-ikili-stand-up-gecesi",
  "https://biletinial.com/tr-tr/tiyatro/madonna-kurk-mantolu-frlrt",
  "https://biletinial.com/tr-tr/tiyatro/sen-gara-degilsin-ornd",
  "https://biletinial.com/tr-tr/tiyatro/mini-mini-bir-kus-muzikali",
  "https://biletinial.com/tr-tr/tiyatro/catidaki-yarasa",
  "https://biletinial.com/tr-tr/tiyatro/diyalektik-tiyatro-ekibi-dogaclama-tiyatro-gosterisi",
  "https://biletinial.com/tr-tr/tiyatro/skec-turnuvasi-all-star",
  "https://biletinial.com/tr-tr/tiyatro/kahramanlarin-hazine-macerasi",
  "https://biletinial.com/tr-tr/tiyatro/oyun-bozan",
  "https://biletinial.com/tr-tr/tiyatro/koza-lar",
  "https://biletinial.com/tr-tr/tiyatro/stand-up-gecesi-tytr-kiraz",
  "https://biletinial.com/tr-tr/tiyatro/eskisehir-komedi-aksami",
  "https://biletinial.com/tr-tr/tiyatro/besiktas-stand-up-gecesi-s420",
  "https://biletinial.com/tr-tr/tiyatro/ted-bundy-tiyatro-keyfi",
  "https://biletinial.com/tr-tr/tiyatro/katmer-dogaclama",
  "https://biletinial.com/tr-tr/tiyatro/ankara-standup-gecesi-yani-standup",
  "https://biletinial.com/tr-tr/tiyatro/gonder-gelsin",
  "https://biletinial.com/tr-tr/tiyatro/gidiklamalar-zkrypm",
  "https://biletinial.com/tr-tr/tiyatro/cadde-stand-up-cts",
  "https://biletinial.com/tr-tr/tiyatro/besiktas-stand-up-night-cumartesi",
  "https://biletinial.com/tr-tr/tiyatro/firat-esmer-stand-up-tklndrs",
  "https://biletinial.com/tr-tr/tiyatro/taksim-4lu-stand-up-komedi-gosterisi-leman-kultur",
  "https://biletinial.com/tr-tr/tiyatro/taksim-stand-up-gecesi",
  "https://biletinial.com/tr-tr/tiyatro/stand-up-gecesi-falan",
  "https://biletinial.com/tr-tr/tiyatro/tam-90dan-kabare",
  "https://biletinial.com/tr-tr/tiyatro/ak-ciger",
  "https://biletinial.com/tr-tr/tiyatro/cimri-devlet-tiyatrosu",
  "https://biletinial.com/tr-tr/tiyatro/edepsiz-komedi-doruk-tyt",
  "https://biletinial.com/tr-tr/tiyatro/fareli-koyun-kavalcisi-onuncukoy",
  "https://biletinial.com/tr-tr/tiyatro/masallar-diyari-orenda",
  "https://biletinial.com/tr-tr/tiyatro/mavi-kahramalar-muzikali",
  "https://biletinial.com/tr-tr/tiyatro/orumcek-adam-macerasi",
  "https://biletinial.com/tr-tr/tiyatro/karagoz-balikci-bursa-ks",
  "https://biletinial.com/tr-tr/tiyatro/yaramazlar-sirki-kyb",
  "https://biletinial.com/tr-tr/tiyatro/gokkusagi-sokagi",
  "https://biletinial.com/tr-tr/tiyatro/minicraft-nether-macerasi",
  "https://biletinial.com/tr-tr/tiyatro/kayip-hazine-kim",
  "https://biletinial.com/tr-tr/tiyatro/oyun-karisti-fmt",
  "https://biletinial.com/tr-tr/tiyatro/bir-idam-mahkumunun-son-gunu-bambu-sahne",
  "https://biletinial.com/tr-tr/tiyatro/korkuyu-beklerken-entropi",
  "https://biletinial.com/tr-tr/tiyatro/herkes-mi-aldatir",
  "https://biletinial.com/tr-tr/tiyatro/senin-yuzunden",
  "https://biletinial.com/tr-tr/tiyatro/bocekler-frltytr",
  "https://biletinial.com/tr-tr/tiyatro/tunali-hilmi-cinayeti-aoo",
  "https://biletinial.com/tr-tr/tiyatro/acik-mikrofon-stand-up-sfralt",
  "https://biletinial.com/tr-tr/tiyatro/bogazici-komedi-kulubu-kadikoy-standup-gecesi-pazar",
  "https://biletinial.com/tr-tr/tiyatro/afacanlar-sirki",
  "https://biletinial.com/tr-tr/tiyatro/bir-idam-mahkumunun-son-gunu-mea",
  "https://biletinial.com/tr-tr/tiyatro/musasebetsiz-ozdeypm",
  "https://biletinial.com/tr-tr/tiyatro/kizma-birader-fm",
  "https://biletinial.com/tr-tr/tiyatro/serseri-ask-i-kimnu",
  "https://biletinial.com/tr-tr/tiyatro/hayvan-ciftligi-bsahne",
  "https://biletinial.com/tr-tr/tiyatro/is",
  "https://biletinial.com/tr-tr/tiyatro/olumcul-oyun-tyc",
  "https://biletinial.com/tr-tr/tiyatro/ipekten-sanat-dogaclama-gecesi",
  "https://biletinial.com/tr-tr/tiyatro/mahzuni-serif-ankara-birlik-tiyatro",
  "https://biletinial.com/tr-tr/tiyatro/parkta-guzel-bir-gun-lefko%C5%9Fa-bt",
  "https://biletinial.com/tr-tr/tiyatro/alti-ustu-stand-up-gecesi",
  "https://biletinial.com/tr-tr/tiyatro/interaktif-krz",
  "https://biletinial.com/tr-tr/tiyatro/acik-mikrofon-stand-up-komedi-besiktas",
  "https://biletinial.com/tr-tr/tiyatro/engin-turkoglu-stand-up",
  "https://biletinial.com/tr-tr/tiyatro/plastik-asklar-glow-medya",
  "https://biletinial.com/tr-tr/tiyatro/meddah-grnma",
  "https://biletinial.com/tr-tr/tiyatro/morgue-sokagi-cinayeti-yakin-sahne",
  "https://biletinial.com/tr-tr/tiyatro/bir-delinin-hatira-defteri-atacan-sanli-suleyman-ceylan",
  "https://biletinial.com/tr-tr/tiyatro/gorki-oda-tiyatrosu-",
  "https://biletinial.com/tr-tr/tiyatro/yetiskinlere-karagoz-hacivat-golge-oyunu",
  "https://biletinial.com/tr-tr/tiyatro/canlar-kimin-icin-caliyor",
  "https://biletinial.com/tr-tr/tiyatro/secim-dansi-fay",
  "https://biletinial.com/tr-tr/tiyatro/kucuk-prens-onuncu-koy",
  "https://biletinial.com/tr-tr/tiyatro/vampir-koylu",
  "https://biletinial.com/tr-tr/tiyatro/milli-mucadelenin-cesur-ve-kayip-kadinleri-dt",
  "https://biletinial.com/tr-tr/tiyatro/konserve-fabrikasi-ornd",
  "https://biletinial.com/tr-tr/tiyatro/uzman-tiyatro-dogaclama-gecesi-ipktn",
  "https://biletinial.com/tr-tr/tiyatro/bir-idam-mahkumunun-son-gunu-muhammet-yonca-kyb",
  "https://biletinial.com/tr-tr/tiyatro/standup-istanbul-kadikoyozel",
  "https://biletinial.com/tr-tr/tiyatro/stand-up-kadikoy-yota-",
  "https://biletinial.com/tr-tr/tiyatro/stand-up-kadikoy-motto",
  "https://biletinial.com/tr-tr/tiyatro/hacettepe-komedi-acik-mikrofon",
  "https://biletinial.com/tr-tr/tiyatro/stand-up-gecesi-extra-tytr-kiraz",
  "https://biletinial.com/tr-tr/tiyatro/taksim-acik-mikrofon-leman-stand-up",
  "https://biletinial.com/tr-tr/tiyatro/kari-koca-isleri-anil",
  "https://biletinial.com/tr-tr/tiyatro/yasar-ne-yasar-ne-yasamaz-doruk-tytr",
  "https://biletinial.com/tr-tr/tiyatro/acik-mikrofon-falan",
  "https://biletinial.com/tr-tr/tiyatro/tamamla-bizi-ey-ask",
  "https://biletinial.com/tr-tr/tiyatro/pinokyo-go",
  "https://biletinial.com/tr-tr/tiyatro/wonderland-cocuk-festivali",
  "https://biletinial.com/tr-tr/tiyatro/karagoz-ruyalar-aleminde-bursa-muze",
  "https://biletinial.com/tr-tr/tiyatro/ari-kardes",
  "https://biletinial.com/tr-tr/tiyatro/online-diksiyon-egitimi",
  "https://biletinial.com/tr-tr/tiyatro/katil-kim-",
  "https://biletinial.com/tr-tr/tiyatro/bir-ishaksin-bir-cemil-ornd",
  "https://biletinial.com/tr-tr/tiyatro/bogazici-komedi-kulubu-kadikoy-stand-up-gecesi",
  "https://biletinial.com/tr-tr/tiyatro/acik-mikrofon-ekstra-tkiraz",
  "https://biletinial.com/tr-tr/tiyatro/hidayet-tili-stand-up",
  "https://biletinial.com/tr-tr/tiyatro/once-bir-bosluk-oldu-kalp-gidince-ama-simdi-iyi",
  "https://biletinial.com/tr-tr/tiyatro/alsancak-stand-up-gecesi",
  "https://biletinial.com/tr-tr/tiyatro/acik-mikrofon-stand-up-gecesi-izmir",
  "https://biletinial.com/tr-tr/tiyatro/bayram-oguz-gungor-stand-up-motto-kadikoy",
  "https://biletinial.com/tr-tr/tiyatro/rota-stand-up-gecesi",
  "https://biletinial.com/tr-tr/tiyatro/ankara-stand-up-gecesi-6li",
  "https://biletinial.com/tr-tr/tiyatro/apartman-sahne-impro-night-ts",
  "https://biletinial.com/tr-tr/tiyatro/hacettepe-komedi-stand-up-gecesi",
  "https://biletinial.com/tr-tr/tiyatro/butik-unlu-yunus-gunce-stand-up-gosterisi",
  "https://biletinial.com/tr-tr/tiyatro/cadde-stand-up-gecesi",
  "https://biletinial.com/tr-tr/tiyatro/taksim-acik-mikrofon",
  "https://biletinial.com/tr-tr/tiyatro/velvele-sanat-dogaclama",
  "https://biletinial.com/tr-tr/tiyatro/kirmizi-baslikli-kiz-onuncukoy",
  "https://biletinial.com/tr-tr/tiyatro/palyacolar-diyari-ornda",
  "https://biletinial.com/tr-tr/tiyatro/kaybolan-minyon-boyz",
  "https://biletinial.com/tr-tr/tiyatro/donme-dolap-rds",
  "https://biletinial.com/tr-tr/tiyatro/bir-adam-yaratmak-bursa-bb",
  "https://biletinial.com/tr-tr/tiyatro/hicbir-sey-fade-sta",
  "https://biletinial.com/tr-tr/tiyatro/bogazici-komedi-kulubu-kadikoy-acik-mikrofon-standup-",
  "https://biletinial.com/tr-tr/tiyatro/havadan-cicekten-stand-up",
  "https://biletinial.com/tr-tr/tiyatro/ivan-ilyicin-olumu",
  "https://biletinial.com/tr-tr/tiyatro/ask-tamircisi",
  "https://biletinial.com/tr-tr/tiyatro/selin-dilmac-stand-up",
  "https://biletinial.com/tr-tr/tiyatro/kara-komedi-gecesi",
  "https://biletinial.com/tr-tr/tiyatro/interaktif-bar-komedisi-sinart",
  "https://biletinial.com/tr-tr/tiyatro/felaketler-ulkesi-bakus",
  "https://biletinial.com/tr-tr/tiyatro/tartuffe-tytr-peron",
  "https://biletinial.com/tr-tr/tiyatro/selman-gokyar-zaten-tek-kisilik-stand-up",
  "https://biletinial.com/tr-tr/tiyatro/standup-taksim-gecesi-prsmb-infnt-shn",
  "https://biletinial.com/tr-tr/tiyatro/besiktas-stand-up-night",
  "https://biletinial.com/tr-tr/tiyatro/deep-turkish-web",
  "https://biletinial.com/tr-tr/tiyatro/the-comedy-fest-bodrum-kombine-1-gun",
  "https://biletinial.com/tr-tr/tiyatro/beden-farkindaligi-ve-drama-atolyesi-the-comedy-fest-bodrum",
  "https://biletinial.com/tr-tr/tiyatro/bitkisel-mum-atolyesi-the-comedy-fest-bodrum",
  "https://biletinial.com/tr-tr/tiyatro/yan-rol-the-comedy-fest-bodrum",
  "https://biletinial.com/tr-tr/tiyatro/kim-tiyatro-ekibi-interaktif-dogaclama-tiyatro-gosterisi-ksa",
  "https://biletinial.com/tr-tr/tiyatro/bir-ishaksin-bir-cemil",
  "https://biletinial.com/tr-tr/tiyatro/pippa-adinda-baris-iklmlr",
  "https://biletinial.com/tr-tr/tiyatro/sahne-senin-goster-kendini",
  "https://biletinial.com/tr-tr/tiyatro/eskisehirin-kurtulusu-ozel-konseri-ebb",
  "https://biletinial.com/tr-tr/tiyatro/caligula-adt",
  "https://biletinial.com/tr-tr/tiyatro/acik-mikrofon-tkiraz",
  "https://biletinial.com/tr-tr/tiyatro/stand-up-taksim-gecesi-infnt",
  "https://biletinial.com/tr-tr/tiyatro/besiktas-standup-night-cuma",
  "https://biletinial.com/tr-tr/tiyatro/cadde-stand-up-gecesi-cuma",
  "https://biletinial.com/tr-tr/tiyatro/cyrano-",
  "https://biletinial.com/tr-tr/tiyatro/mesut-sure-stand-up-the-comedy-fest-bodrum",
  "https://biletinial.com/tr-tr/tiyatro/the-comedy-fest-bodrum-kombine-2-gun",
  "https://biletinial.com/tr-tr/tiyatro/karakter-yaratim-ve-kamera-oyunculuk-atolyesi-the-comedy-fest-bodrum",
  "https://biletinial.com/tr-tr/tiyatro/hikaye-anlaticiligi-atolyesi-the-comedy-fest-bodrum",
  "https://biletinial.com/tr-tr/tiyatro/sirinler-derinsnt",
  "https://biletinial.com/tr-tr/tiyatro/kozmik-birligin-kahramanlari",
  "https://biletinial.com/tr-tr/tiyatro/kucuk-prens-ays",
  "https://biletinial.com/tr-tr/tiyatro/kahramanlarin-hazine-macerasi-brnfs",
  "https://biletinial.com/tr-tr/tiyatro/pinokyo-kyb-medya",
  "https://biletinial.com/tr-tr/tiyatro/sonic-super-kahraman",
  "https://biletinial.com/tr-tr/tiyatro/tom-ve-jerry-boyoz",
  "https://biletinial.com/tr-tr/tiyatro/kirmizi-baslikli-kurt-demrk",
  "https://biletinial.com/tr-tr/tiyatro/fifi-tduragi",
  "https://biletinial.com/tr-tr/tiyatro/parfum-tasarim-atolyesi-the-comedy-fest-bodrum",
  "https://biletinial.com/tr-tr/tiyatro/mahser-i-cumbus-",
  "https://biletinial.com/tr-tr/tiyatro/spanos-ve-kirk-ejderha",
  "https://biletinial.com/tr-tr/tiyatro/masa-ile-koca-ayi-cesur-kasif",
  "https://biletinial.com/tr-tr/tiyatro/gercek-hazine-dmrk",
  "https://biletinial.com/tr-tr/tiyatro/cadde-stand-up-2li",
  "https://biletinial.com/tr-tr/tiyatro/salih-acar-tek-kisilik-stand-up",
  "https://biletinial.com/tr-tr/tiyatro/nolacak-bu-yusuf-umutun-hali-the-comedy-fest-bodrum",
  "https://biletinial.com/tr-tr/tiyatro/ted-bundy",
  "https://biletinial.com/tr-tr/tiyatro/hastalik-hastasi",
  "https://biletinial.com/tr-tr/tiyatro/dava-yakin-tiyatro",
  "https://biletinial.com/tr-tr/tiyatro/olun-bizi-ayirana-dek-grg",
  "https://biletinial.com/tr-tr/tiyatro/kocami-gomme-toreni",
  "https://biletinial.com/tr-tr/tiyatro/3-sap-dogaclama",
  "https://biletinial.com/tr-tr/tiyatro/hic-kimsenin-oykusu",
  "https://biletinial.com/tr-tr/tiyatro/saf-komedi-the-comedy-fest-bodrum",
  "https://biletinial.com/tr-tr/tiyatro/the-comedy-fest-bodrum-kombine-3-gun",
  "https://biletinial.com/tr-tr/tiyatro/akil-oyunlari-atolyesi-the-comedy-fest-bodrum",
  "https://biletinial.com/tr-tr/tiyatro/minyonlar-suyun-onemi",
  "https://biletinial.com/tr-tr/tiyatro/masa-ile-koca-ayi-noel-ruyasi-kyb",
  "https://biletinial.com/tr-tr/tiyatro/aslan-kral-tdrgi",
  "https://biletinial.com/tr-tr/tiyatro/sokak-kopekleri-muzikali",
  "https://biletinial.com/tr-tr/tiyatro/karlar-ulkesi-olafin-ruyasi",
  "https://biletinial.com/tr-tr/tiyatro/akilli-ibis-dmrk",
  "https://biletinial.com/tr-tr/tiyatro/kokteyl-yapim-the-comedy-fest-bodrum",
  "https://biletinial.com/tr-tr/tiyatro/cizmeli-kedi-dmrk",
  "https://biletinial.com/tr-tr/tiyatro/bir-osmanli-masali-fmt",
  "https://biletinial.com/tr-tr/tiyatro/sifir-telas",
  "https://biletinial.com/tr-tr/tiyatro/online-yaratici-drama-egitmenligi-egitimi-sertifikasi",
  "https://biletinial.com/tr-tr/tiyatro/askta-galip-yoktur-tdurgi",
  "https://biletinial.com/tr-tr/tiyatro/tatlim-tatlim-kyb",
  "https://biletinial.com/tr-tr/tiyatro/kurtulus-usakb",
  "https://biletinial.com/tr-tr/tiyatro/taksim-stand-up-pazari",
  "https://biletinial.com/tr-tr/tiyatro/a-kursat-ocalan-ve-giray-altinok-ile-emrivaki-show-the-comedy-fest-bodrum",
  "https://biletinial.com/tr-tr/tiyatro/bir-yaz-donumu-gecesi-ruyasi-kulis-sanat",
  "https://biletinial.com/tr-tr/tiyatro/romeo-julieti-seviyor-sst",
  "https://biletinial.com/tr-tr/tiyatro/bir-delinin-hatira-defteri-erdal-besikcioglu",
  "https://biletinial.com/tr-tr/tiyatro/derwes-yan-godo-amed",
  "https://biletinial.com/tr-tr/tiyatro/grease-muzikali",
  "https://biletinial.com/tr-tr/tiyatro/los-isler-skec-geceleri",
  "https://biletinial.com/tr-tr/tiyatro/sunay-akin-ile-yuz-yuze-isf",
  "https://biletinial.com/tr-tr/tiyatro/kulav-u-peyk",
  "https://biletinial.com/tr-tr/tiyatro/ringimpro",
  "https://biletinial.com/tr-tr/tiyatro/sayin-yargic",
  "https://biletinial.com/tr-tr/tiyatro/curume-ykshne",
  "https://biletinial.com/tr-tr/tiyatro/notre-dame-muzikali-kumbaragst",
  "https://biletinial.com/tr-tr/tiyatro/bir-gece-daha",
  "https://biletinial.com/tr-tr/tiyatro/acik-stand-up-gecesi-falan",
  "https://biletinial.com/tr-tr/tiyatro/atlantik-cocuk-festivali",
  "https://biletinial.com/tr-tr/tiyatro/memleket-meselesi",
  "https://biletinial.com/tr-tr/tiyatro/ruh-okuzum-ss",
  "https://biletinial.com/tr-tr/tiyatro/bosanma-teklifi",
  "https://biletinial.com/tr-tr/tiyatro/siddet-dersi-kulis",
  "https://biletinial.com/tr-tr/tiyatro/mesut-sure-ile-iliski-testi",
  "https://biletinial.com/tr-tr/tiyatro/amadeus-piu",
  "https://biletinial.com/tr-tr/tiyatro/deku-dolaben-scapen-",
  "https://biletinial.com/tr-tr/tiyatro/samira-demir-sonsuz-yol-oryantal-dans-gosterisi",
  "https://biletinial.com/tr-tr/tiyatro/yedikocali-hurmuz-atf",
  "https://biletinial.com/tr-tr/tiyatro/ask-grevi-kulis-sanat",
  "https://biletinial.com/tr-tr/tiyatro/bernarda-prj-no2",
  "https://biletinial.com/tr-tr/tiyatro/erkekler-gulemez",
  "https://biletinial.com/tr-tr/tiyatro/kusursuz-tduragi",
  "https://biletinial.com/tr-tr/tiyatro/donusum-altkat",
  "https://biletinial.com/tr-tr/tiyatro/mavi-muzikhol",
  "https://biletinial.com/tr-tr/tiyatro/prima-facie",
  "https://biletinial.com/tr-tr/tiyatro/odadaki-sihirbaz-kbl",
  "https://biletinial.com/tr-tr/tiyatro/pirtlatan-bal-akf",
  "https://biletinial.com/tr-tr/tiyatro/sirinler-cadiya-karsi",
  "https://biletinial.com/tr-tr/tiyatro/agustos-bocegi-karincanin-macerasi-kyb",
  "https://biletinial.com/tr-tr/tiyatro/pamuk-prenses",
  "https://biletinial.com/tr-tr/tiyatro/niloya-muzikali",
  "https://biletinial.com/tr-tr/tiyatro/sokratesin-son-gecesi-cankaya-sahne",
  "https://biletinial.com/tr-tr/tiyatro/ben-nazim-hikmet",
  "https://biletinial.com/tr-tr/tiyatro/bir-delinin-hatira-defteri-edip-tufekci",
  "https://biletinial.com/tr-tr/tiyatro/datem-geldi",
  "https://biletinial.com/tr-tr/tiyatro/kucuk-prens-muzikali-kobat",
  "https://biletinial.com/tr-tr/tiyatro/bir-delinin-hatira-defteri-klbk",
  "https://biletinial.com/tr-tr/tiyatro/koray-balci-stand-up",
  "https://biletinial.com/tr-tr/tiyatro/beyoglu-stand-up-gecesi",
  "https://biletinial.com/tr-tr/tiyatro/erkeklik-sizde-kalsin",
  "https://biletinial.com/tr-tr/tiyatro/ermisler-ya-da-gunahkarlar",
  "https://biletinial.com/tr-tr/tiyatro/salincakta-iki-kisi",
  "https://biletinial.com/tr-tr/tiyatro/kapali-gise-deli-sanat",
  "https://biletinial.com/tr-tr/tiyatro/mikrobistan-cocuk-oyunu",
  "https://biletinial.com/tr-tr/tiyatro/ibis-adinda-bir-ibis",
  "https://biletinial.com/tr-tr/tiyatro/peter-pan-kurak-ada",
  "https://biletinial.com/tr-tr/tiyatro/alchera-tam-sanat",
  "https://biletinial.com/tr-tr/tiyatro/cimri-fskhne",
  "https://biletinial.com/tr-tr/tiyatro/uc-kavanoz-ve-bir-kavanoz-kul",
  "https://biletinial.com/tr-tr/tiyatro/kayip-duygularima",
  "https://biletinial.com/tr-tr/tiyatro/komedi-girgir-stand-up-gecesi",
  "https://biletinial.com/tr-tr/tiyatro/emlaktan-baba",
  "https://biletinial.com/tr-tr/tiyatro/bin-dokuzyuz-seksen-dort",
  "https://biletinial.com/tr-tr/tiyatro/romada-bir-cinayet",
  "https://biletinial.com/tr-tr/tiyatro/ayip-ettik",
  "https://biletinial.com/tr-tr/tiyatro/ruya-oyunu-yakin-tytr",
  "https://biletinial.com/tr-tr/tiyatro/satonun-altinda-yy",
  "https://biletinial.com/tr-tr/tiyatro/ite-kaka-ss",
  "https://biletinial.com/tr-tr/tiyatro/hipnozcu-kyb",
  "https://biletinial.com/tr-tr/tiyatro/matruska-kok35",
  "https://biletinial.com/tr-tr/tiyatro/en-guzel-ask-sarkilarini-erkekler-yazar",
  "https://biletinial.com/tr-tr/tiyatro/dali-turkiyede",
  "https://biletinial.com/tr-tr/tiyatro/aykiri-dusunceler-egemen-simsek",
  "https://biletinial.com/tr-tr/tiyatro/beyaz-geceler-cankaya-sahne",
  "https://biletinial.com/tr-tr/tiyatro/capkinin-dusu-baht-tytr-",
  "https://biletinial.com/tr-tr/tiyatro/olu-ozanlar-dernegi-bsmkt",
  "https://biletinial.com/tr-tr/tiyatro/richard",
  "https://biletinial.com/tr-tr/tiyatro/yasamaya-dair-uruorg",
  "https://biletinial.com/tr-tr/tiyatro/pijamaskekiler-kuklaciya-karsi",
  "https://biletinial.com/tr-tr/tiyatro/jeanne-darcin-oteki-olumu",
  "https://biletinial.com/tr-tr/tiyatro/sevgili-beynimin-icindeki",
  "https://biletinial.com/tr-tr/tiyatro/tirat-geceleri-dian",
  "https://biletinial.com/tr-tr/tiyatro/gel-bi-konusalim-oan",
  "https://biletinial.com/tr-tr/tiyatro/acilis-ozel-konseri-ebb",
  "https://biletinial.com/tr-tr/tiyatro/van-gogh-fskhne",
  "https://biletinial.com/tr-tr/tiyatro/kibarlik-budalasi",
  "https://biletinial.com/tr-tr/tiyatro/prometheus",
  "https://biletinial.com/tr-tr/tiyatro/binevi-dogaclama",
  "https://biletinial.com/tr-tr/tiyatro/harry-potter-sihrin-yolculugu",
  "https://biletinial.com/tr-tr/tiyatro/tas-devri-basamak-tytr",
  "https://biletinial.com/tr-tr/tiyatro/bir-tuhaf-uzay-macerasi-akil-fkr",
  "https://biletinial.com/tr-tr/tiyatro/niloya-renkli-baliklar-muzikali-istinyeart",
  "https://biletinial.com/tr-tr/tiyatro/seksen-gunde-dunya-turuu",
  "https://biletinial.com/tr-tr/tiyatro/shrek-karlar-ulkesi-meyve-festivalinde",
  "https://biletinial.com/tr-tr/tiyatro/bulut-oyunu",
  "https://biletinial.com/tr-tr/tiyatro/alice-harikalar-diyarinda-kybm",
  "https://biletinial.com/tr-tr/tiyatro/burnunu-kaybeden-palyaco-fskhne",
  "https://biletinial.com/tr-tr/tiyatro/hansel-ve-gretel-reverans",
  "https://biletinial.com/tr-tr/tiyatro/tobi-citcit-terzi",
  "https://biletinial.com/tr-tr/tiyatro/seksen-gunde-devri-alem-bkt",
  "https://biletinial.com/tr-tr/tiyatro/piraye-mina-sanat-yapim",
  "https://biletinial.com/tr-tr/tiyatro/siyahi-birey-adasi",
  "https://biletinial.com/tr-tr/tiyatro/frida-mnsnt",
  "https://biletinial.com/tr-tr/tiyatro/3-ya-da-cik-eylul",
  "https://biletinial.com/tr-tr/tiyatro/herkes-kocama-benziyor-mozart-psm",
  "https://biletinial.com/tr-tr/tiyatro/ten-rengi",
  "https://biletinial.com/tr-tr/tiyatro/lavanta-cinayetleri-mc2",
  "https://biletinial.com/tr-tr/tiyatro/mutlu-bir-romanin-ask-hikayesi-boa",
  "https://biletinial.com/tr-tr/tiyatro/ben-berlin-tslt",
  "https://biletinial.com/tr-tr/tiyatro/oyuncakci-aralik",
  "https://biletinial.com/tr-tr/tiyatro/kukuli-muzikali-istinyeart",
  "https://biletinial.com/tr-tr/tiyatro/oliver-twist-glow",
  "https://biletinial.com/tr-tr/tiyatro/beyaz-kalemin-renkli-dunyasi-ttmp",
  "https://biletinial.com/tr-tr/tiyatro/kurbaga-prens-fskhne",
  "https://biletinial.com/tr-tr/tiyatro/nasrettin-hoca-kukla-show",
  "https://biletinial.com/tr-tr/tiyatro/puro-ile-leyla-ft",
  "https://biletinial.com/tr-tr/tiyatro/guzel-son-fskhne",
  "https://biletinial.com/tr-tr/tiyatro/komur-adam",
  "https://biletinial.com/tr-tr/tiyatro/emrah-topal-standup",
  "https://biletinial.com/tr-tr/tiyatro/cinayet-sirketi-yakin-tiyatro",
  "https://biletinial.com/tr-tr/tiyatro/istanbul-fringe-festival-oyunlari-ahretlik-fskhne",
  "https://biletinial.com/tr-tr/tiyatro/kim-bu-ben-moda",
  "https://biletinial.com/tr-tr/tiyatro/cingeneler-zamani-muzikali-kmbrgs",
  "https://biletinial.com/tr-tr/tiyatro/kaan-sekban-sacmalar-vigor",
  "https://biletinial.com/tr-tr/tiyatro/hipnozcu-ornd",
  "https://biletinial.com/tr-tr/tiyatro/dogaclama-tiyatro-piyes",
  "https://biletinial.com/tr-tr/tiyatro/misket-boa",
  "https://biletinial.com/tr-tr/tiyatro/kem",
  "https://biletinial.com/tr-tr/tiyatro/bir-alafranga-muhabbet",
  "https://biletinial.com/tr-tr/tiyatro/veda-fskhne",
  "https://biletinial.com/tr-tr/tiyatro/buyuk-gozalti-aysa",
  "https://biletinial.com/tr-tr/tiyatro/sanat-moda",
  "https://biletinial.com/tr-tr/tiyatro/butun-kadinlarin-kafasi-karisiktir-aysa",
  "https://biletinial.com/tr-tr/tiyatro/bagzi-seyler",
  "https://biletinial.com/tr-tr/tiyatro/buka-leki",
  "https://biletinial.com/tr-tr/tiyatro/saatleri-ayarlama-enstitusu",
  "https://biletinial.com/tr-tr/tiyatro/cilgin-dunya-kulis",
  "https://biletinial.com/tr-tr/tiyatro/bir-alzheimerin-anilari",
  "https://biletinial.com/tr-tr/tiyatro/mc-sacinti-itiraz-ediyorum-",
  "https://biletinial.com/tr-tr/tiyatro/einsteinin-ihaneti-modasahnesi",
  "https://biletinial.com/tr-tr/tiyatro/eglenceli-cinayetler-kumpanyasi-sette-cinayet",
  "https://biletinial.com/tr-tr/tiyatro/mufettis-akil-fikir",
  "https://biletinial.com/tr-tr/tiyatro/mem-u-zin-amed",
  "https://biletinial.com/tr-tr/tiyatro/uc-kere-mavi-panto",
  "https://biletinial.com/tr-tr/tiyatro/tirat-geceleri-dian-sn",
  "https://biletinial.com/tr-tr/tiyatro/troyali-kadinlar-cankaya-sahne",
  "https://biletinial.com/tr-tr/tiyatro/babami-kim-oldurdu-tyndn",
  "https://biletinial.com/tr-tr/tiyatro/dongu-korkut-efsaneleri-ttempo",
  "https://biletinial.com/tr-tr/tiyatro/agladim-oda-tiyatrosu",
  "https://biletinial.com/tr-tr/tiyatro/sen-makas-ss",
  "https://biletinial.com/tr-tr/tiyatro/belirsizlikle-barismak",
  "https://biletinial.com/tr-tr/tiyatro/nazimname-bir-gidis-hikayesi-afk",
  "https://biletinial.com/tr-tr/tiyatro/yaz-gecesi-muzikali-baht",
  "https://biletinial.com/tr-tr/tiyatro/salih-tiras-standup",
  "https://biletinial.com/tr-tr/tiyatro/dugun-sarkicisi-gagana",
  "https://biletinial.com/tr-tr/tiyatro/findikkiran-ve-fareler-krali-istinyeart",
  "https://biletinial.com/tr-tr/tiyatro/winie-the-pooh-cocuk-muzikali",
  "https://biletinial.com/tr-tr/tiyatro/anka-dusler-sirki",
  "https://biletinial.com/tr-tr/tiyatro/kucuk-karabalik-afk",
  "https://biletinial.com/tr-tr/tiyatro/hansel-ve-gretel-doga-dostlari",
  "https://biletinial.com/tr-tr/tiyatro/oyuncak-hikayesi-fskhne",
  "https://biletinial.com/tr-tr/tiyatro/pinokyo-cocuk-tiyatrosu-oyun-alani",
  "https://biletinial.com/tr-tr/tiyatro/don-kisot-muzikali-onuncukoy",
  "https://biletinial.com/tr-tr/tiyatro/sirinler-kamp-maceralari-syapim",
  "https://biletinial.com/tr-tr/tiyatro/kopenhag",
  "https://biletinial.com/tr-tr/tiyatro/cizmeli-kedi-muzikali-fskhne",
  "https://biletinial.com/tr-tr/tiyatro/biri-ailemi-dedi-sypm",
  "https://biletinial.com/tr-tr/tiyatro/buse-sinem-iren-gks",
  "https://biletinial.com/tr-tr/tiyatro/komsu-koyun-delisi",
  "https://biletinial.com/tr-tr/tiyatro/celile-nazim-hikmetin-annesi-kht",
  "https://biletinial.com/tr-tr/tiyatro/kanli-nigar-",
  "https://biletinial.com/tr-tr/tiyatro/ayiptir-soylemesi",
  "https://biletinial.com/tr-tr/tiyatro/nesli-tukenmemisler",
  "https://biletinial.com/tr-tr/tiyatro/erdal-kaya-standup",
  "https://biletinial.com/tr-tr/tiyatro/fosforlu-cevriye-hun",
  "https://biletinial.com/tr-tr/tiyatro/yastik-adam",
  "https://biletinial.com/tr-tr/tiyatro/seni-gidi-beni-tytrname-esatgil",
  "https://biletinial.com/tr-tr/tiyatro/bartleby-ykin-tytr",
  "https://biletinial.com/tr-tr/tiyatro/sir-fskhane",
  "https://biletinial.com/tr-tr/tiyatro/cimri-afk",
  "https://biletinial.com/tr-tr/tiyatro/ozgur-turhan-moda",
  "https://biletinial.com/tr-tr/tiyatro/sofor-nebahat",
  "https://biletinial.com/tr-tr/tiyatro/madagaskar-sirki-mogolistan-buyulu-dunya-turu",
  "https://biletinial.com/tr-tr/tiyatro/baby-shark-lisansli-gosteri",
  "https://biletinial.com/tr-tr/tiyatro/seker-portakali-ilhami-akcn",
  "https://biletinial.com/tr-tr/tiyatro/z-takimi-istinyeart",
  "https://biletinial.com/tr-tr/tiyatro/sarkiyla-sallanan-salincak-ttempo",
  "https://biletinial.com/tr-tr/tiyatro/44kedi-muzikali-fskhne",
  "https://biletinial.com/tr-tr/tiyatro/kirmizi-baslikli-kiz-bambu",
  "https://biletinial.com/tr-tr/tiyatro/sihirbaz-erol-kyb-medya",
  "https://biletinial.com/tr-tr/tiyatro/alice-harikalar-diyarinda-harmoni-kitabi",
  "https://biletinial.com/tr-tr/tiyatro/kirmizi-baslikli-kiz-kurt-reverans",
  "https://biletinial.com/tr-tr/tiyatro/kucuk-prens-arkadaslari",
  "https://biletinial.com/tr-tr/tiyatro/kral-sakir-kapaodokya-macerasi",
  "https://biletinial.com/tr-tr/tiyatro/shirley-fskhne",
  "https://biletinial.com/tr-tr/tiyatro/ucmak-ozgurluktur",
  "https://biletinial.com/tr-tr/tiyatro/mutluluk-icimizde-mi",
  "https://biletinial.com/tr-tr/tiyatro/hallac-i-mansur",
  "https://biletinial.com/tr-tr/tiyatro/mutluluk-seansi",
  "https://biletinial.com/tr-tr/tiyatro/veda-tytrkare",
  "https://biletinial.com/tr-tr/tiyatro/kun-tno40",
  "https://biletinial.com/tr-tr/tiyatro/seda-yuz-standup-moda",
  "https://biletinial.com/tr-tr/tiyatro/buyur-burdan-kac-bs",
  "https://biletinial.com/tr-tr/tiyatro/uyanis-ankt",
  "https://biletinial.com/tr-tr/tiyatro/afet-diana-moda",
  "https://biletinial.com/tr-tr/tiyatro/son-cagri-",
  "https://biletinial.com/tr-tr/tiyatro/anne-moda",
  "https://biletinial.com/tr-tr/tiyatro/halime-aksoyun-torunu",
  "https://biletinial.com/tr-tr/tiyatro/tirat-geceleri-dian-sanat",
  "https://biletinial.com/tr-tr/tiyatro/nolcak-bu-yusuf-umutun-hali-moda",
  "https://biletinial.com/tr-tr/tiyatro/icinden-tramvay-gecen-sarki",
  "https://biletinial.com/tr-tr/tiyatro/cok-duzgun-bir-kiz",
  "https://biletinial.com/tr-tr/tiyatro/faust",
  "https://biletinial.com/tr-tr/tiyatro/deathrap-fskhane",
  "https://biletinial.com/tr-tr/tiyatro/sefa-doganay-kokpit",
  "https://biletinial.com/tr-tr/tiyatro/atesin-var-mi-nasi-yani-tdellarte",
  "https://biletinial.com/tr-tr/tiyatro/asgari-curet-baris-balkir",
  "https://biletinial.com/tr-tr/tiyatro/kadin-cinsi",
  "https://biletinial.com/tr-tr/tiyatro/kanli-nigar-hunkultur",
  "https://biletinial.com/tr-tr/tiyatro/dijital-ebeveyn",
  "https://biletinial.com/tr-tr/tiyatro/hamlet-bir-polisiye-komedi",
  "https://biletinial.com/tr-tr/tiyatro/yatiyorum-demirli-bir-silep-gibi-bursada-tkeyfi",
  "https://biletinial.com/tr-tr/tiyatro/karlar-ulkesi-mechule-dogru",
  "https://biletinial.com/tr-tr/tiyatro/elsa-yildiztasi-kolyesi",
  "https://biletinial.com/tr-tr/tiyatro/bremen-mizikacilari-afk",
  "https://biletinial.com/tr-tr/tiyatro/pepee-",
  "https://biletinial.com/tr-tr/tiyatro/ari-maya-mask-tytr",
  "https://biletinial.com/tr-tr/tiyatro/ariel-kucuk-deniz-kizi-muzikali-fskhne",
  "https://biletinial.com/tr-tr/tiyatro/dedektif-pamuk-tp",
  "https://biletinial.com/tr-tr/tiyatro/burak-onurlu-oyunlusarkilar-cocukkonseri",
  "https://biletinial.com/tr-tr/tiyatro/kucuk-prens-tchaplin",
  "https://biletinial.com/tr-tr/tiyatro/oz-buyucusu-kok35",
  "https://biletinial.com/tr-tr/tiyatro/oz-ulkesi-fskhne",
  "https://biletinial.com/tr-tr/tiyatro/hansel-ve-gratel-dmrk",
  "https://biletinial.com/tr-tr/tiyatro/ran-entropi",
  "https://biletinial.com/tr-tr/tiyatro/yalniz-yakin-tytr",
  "https://biletinial.com/tr-tr/tiyatro/piknik-sepeti",
  "https://biletinial.com/tr-tr/tiyatro/sivasa-agit-kht",
  "https://biletinial.com/tr-tr/tiyatro/haruki-murakami-sinagava-maymunu",
  "https://biletinial.com/tr-tr/tiyatro/gulduren-cazibe-bkm",
  "https://biletinial.com/tr-tr/tiyatro/bir-delinin-hatira-defteri-impro",
  "https://biletinial.com/tr-tr/tiyatro/sizi-taniyorum",
  "https://biletinial.com/tr-tr/tiyatro/pepee-sarkilarla-oyunlarla",
  "https://biletinial.com/tr-tr/tiyatro/alis-harikalar-diyarinda-mask",
  "https://biletinial.com/tr-tr/tiyatro/sen-makas-fskhne",
  "https://biletinial.com/tr-tr/tiyatro/son-ts",
  "https://biletinial.com/tr-tr/tiyatro/kucuk-prens-ve-cicek-tyndn",
  "https://biletinial.com/tr-tr/tiyatro/notre-dame-kamburu-asmali-sahne",
  "https://biletinial.com/tr-tr/tiyatro/alpay-erdem-kolsuz-tisort-ormanda-stand-up",
  "https://biletinial.com/tr-tr/tiyatro/kabus-bs",
  "https://biletinial.com/tr-tr/tiyatro/palto-knk",
  "https://biletinial.com/tr-tr/tiyatro/oniki-numarali-adam-yy-kltr-snt",
  "https://biletinial.com/tr-tr/tiyatro/talk-show-olagan-supheliler",
  "https://biletinial.com/tr-tr/tiyatro/barda-son-gece",
  "https://biletinial.com/tr-tr/tiyatro/donme-dolap-durutytr",
  "https://biletinial.com/tr-tr/tiyatro/ahududu-ss",
  "https://biletinial.com/tr-tr/tiyatro/findikkiran-ve-fareler-krali",
  "https://biletinial.com/tr-tr/tiyatro/ben-frida-kahlo-otoportre-piyes",
  "https://biletinial.com/tr-tr/tiyatro/kucuk-bir-ask-masali-tiyatro-cafe",
  "https://biletinial.com/tr-tr/tiyatro/erkek-akli-oksimoron-tyndn",
  "https://biletinial.com/tr-tr/tiyatro/kucuk-prens-ilhami-akcn",
  "https://biletinial.com/tr-tr/tiyatro/80ler-90lar-gulumseten-hatiralar",
  "https://biletinial.com/tr-tr/tiyatro/sevdadir-adt",
  "https://biletinial.com/tr-tr/tiyatro/boeing-boeing-tiyatro-dunyasi-oyunculari",
  "https://biletinial.com/tr-tr/tiyatro/yalniz-basaklara-azgin-boga-devri-alem",
  "https://biletinial.com/tr-tr/tiyatro/cimri-fo",
  "https://biletinial.com/tr-tr/tiyatro/bir-anarsistin-kaza-sonucu-olumu",
  "https://biletinial.com/tr-tr/tiyatro/iz-kefeli",
  "https://biletinial.com/tr-tr/tiyatro/adil-yildirim",
  "https://biletinial.com/tr-tr/tiyatro/ari-maya-ve-dostlari",
  "https://biletinial.com/tr-tr/tiyatro/onlarin-cagi",
  "https://biletinial.com/tr-tr/tiyatro/yeraltindan-notlar-tunali-tiyatro",
  "https://biletinial.com/tr-tr/tiyatro/deniz-kizi-ariel",
  "https://biletinial.com/tr-tr/tiyatro/the-clown-musical-childrens-circus",
  "https://biletinial.com/tr-tr/tiyatro/kadinlik-bizde-kalsin",
  "https://biletinial.com/tr-tr/tiyatro/bana-bir-seyhler-oluyor",
  "https://biletinial.com/tr-tr/tiyatro/kordugum",
  "https://biletinial.com/tr-tr/tiyatro/bir-idam-mahkumunun-son-gunu-kefeli",
  "https://biletinial.com/tr-tr/tiyatro/arkadaslik-sanati-fskhne",
  "https://biletinial.com/tr-tr/tiyatro/cizmeli-kedi-mask",
  "https://biletinial.com/tr-tr/tiyatro/circir-bocekleri-itler-ve-biz-fskhne",
  "https://biletinial.com/tr-tr/tiyatro/berfu-eser-yenenler-cift-terapisi",
  "https://biletinial.com/tr-tr/tiyatro/yerine-sevemem-mc2",
  "https://biletinial.com/tr-tr/tiyatro/sira-bende-mc2",
  "https://biletinial.com/tr-tr/tiyatro/muhteris-sukunet-ank-dev",
  "https://biletinial.com/tr-tr/tiyatro/metin-uca-bunumu-demekistedim",
  "https://biletinial.com/tr-tr/tiyatro/canavar-fisekhane",
  "https://biletinial.com/tr-tr/tiyatro/benimle-delirir-misin-yapici-tiyatro",
  "https://biletinial.com/tr-tr/tiyatro/anne-fskhne",
  "https://biletinial.com/tr-tr/tiyatro/karlar-kralicesi-fpro",
  "https://biletinial.com/tr-tr/tiyatro/sevgili-arsiz-olum-dirmit-moda",
  "https://biletinial.com/tr-tr/tiyatro/zorla-ispanyol",
  "https://biletinial.com/tr-tr/tiyatro/zorba",
  "https://biletinial.com/tr-tr/tiyatro/yan-rol",
  "https://biletinial.com/tr-tr/tiyatro/pinokyo-ss",
  "https://biletinial.com/tr-tr/tiyatro/kurbaga-prens-masali-fprodksyn",
  "https://biletinial.com/tr-tr/tiyatro/dublorun-hikayesi",
  "https://biletinial.com/tr-tr/tiyatro/sevimli-kahramanlar-yilbasi-partisinde",
  "https://biletinial.com/tr-tr/tiyatro/secim-dansi-fskhne",
  "https://biletinial.com/tr-tr/tiyatro/hey-gidi-gunler",
  "https://biletinial.com/tr-tr/tiyatro/tingir-mingir-cocuk-sarkilari-konseri",
  "https://biletinial.com/tr-tr/tiyatro/donusum-samsa",
  "https://biletinial.com/tr-tr/tiyatro/hic-kimse-devri-alem",
  "https://biletinial.com/tr-tr/tiyatro/sifa-niyetine-sufle-sanat",
  "https://biletinial.com/tr-tr/tiyatro/ensemble-rustavi-gurcistan-devlet-halk-danslari",
  "https://biletinial.com/tr-tr/tiyatro/kumbaravan-sinirsiz-tiyatro-online",
];

// async function getId(theatreThumbnail, nameSlug) {
//   return theatreThumbnail
//     .replace(
//       `https://tiyatrolar.com.tr/files/activity/${nameSlug[0]}/${nameSlug}/gallery/`,
//       ""
//     )
//     .split("/")[0];
// }

// async function getNameSlug(url) {
//   return url.replace("https://biletinial.com/tr-tr/tiyatro/", "");
// }

async function getTitle(page) {
  const titleElement = await page.$(
    ".eventSummary > .eventDetails > h1[itemprop=name]"
  );
  const title = await titleElement.evaluate((el) => el.textContent);
  return title;
}

async function getThumbnail(page) {
  const thumbnailElement = await page.$(".eventSummary > .poster img");
  let thumbnail = null;

  if (thumbnailElement) {
    thumbnail = await thumbnailElement.evaluate((el) => el.getAttribute("src"));
  }

  return thumbnail;
}

async function getDuration(page) {
  const durationElement = await page.$(".movieTime");
  if (durationElement === null) {
    return null;
  }

  const duration = await durationElement.evaluate((el) =>
    el.textContent.trim()
  );
  return duration;
}

async function getGenre(page) {
  const genreElement = await page.$(".eventTags span[itemprop=genre]");
  if (genreElement === null) {
    return null;
  }

  let genre = await genreElement.evaluate((el) => el.textContent);

  return genre.trim();
}

async function getStartingDate(page) {
  const element = await page.$(".eventSummary > .eventDetails > .seanceDate");

  if (element === null) return null;

  let textContent = await element.evaluate((el) => el.textContent);
  textContent = textContent.replaceAll("\n", "");

  if (textContent.includes("-")) {
    return textContent.split("-")[0].trim();
  } else {
    return textContent.trim();
  }
}

async function getEndDate(page) {
  const element = await page.$(".eventSummary > .eventDetails > .seanceDate");

  let textContent = await element.evaluate((el) => el.textContent);
  textContent = textContent.replaceAll("\n", "");

  if (textContent.includes("-")) {
    return textContent.split("-")[1].trim();
  } else {
    return textContent.trim();
  }
}

async function getDescription(page) {
  const descriptionElement = await page.$("div[data-content=event-desc]");

  let description = await descriptionElement.evaluate((el) => el.innerHTML);
  return description;
}

async function getTickets(page) {
  const cityElements = await page.$$(".ed-biletler .ed-biletler__sehir");

  let tickets = [];

  for (const cityElement of cityElements) {
    let ticketsPerCity = {
      seances: [],
    };

    ticketsPerCity.city = await (
      await cityElement.$(".ed-biletler__sehir__title h3")
    ).evaluate((el) => el.innerHTML.split("<span>")[0]);

    const ticketElements = await cityElement.$$(".ed-biletler__sehir__gun");

    for (const ticketElement of ticketElements) {
      let seance = {
        location: {},
      };

      seance.startDate = await (
        await ticketElement.$(
          ".ed-biletler__sehir__gun__detay > time[itemprop=startDate]"
        )
      ).evaluate((el) => el.getAttribute("content"));

      seance.endDate = await (
        await ticketElement.$(
          ".ed-biletler__sehir__gun__detay > meta[itemprop=endDate]"
        )
      ).evaluate((el) => el.getAttribute("content"));

      seance.location.name = await (
        await ticketElement.$("address[itemprop=name]")
      ).evaluate((el) => el.textContent.trim());

      seance.location.address = await (
        await ticketElement.$("meta[itemprop=address]")
      ).evaluate((el) => el.getAttribute("content"));

      const ticketButtonElement = await ticketElement.$(
        ".ed-biletler__sehir__gun__fiyat button"
      );
      const isButtonDisabled = await ticketButtonElement.evaluate(
        (button) => button.disabled
      );

      seance.isSoldOut = isButtonDisabled === true;
      seance.url = null;
      if (!isButtonDisabled) {
        const seanceId = await ticketButtonElement.evaluate((el) =>
          el.getAttribute("data-title")
        );
        seance.url = `https://biletinial.com/tr-tr/WebLogin?seanceId=${seanceId}`;
      }

      ticketsPerCity.seances.push(seance);
    }

    tickets.push(ticketsPerCity);
  }

  return tickets;
}

function writeArrayToJSONFile(activities) {
  const jsonContent = JSON.stringify(activities, null, 2); // 2 spaces for indentation

  const filePath = "activities.json"; // Change to your desired file path

  try {
    fs.writeFileSync(filePath, jsonContent);
    console.log(`Array data has been written to ${filePath}`);
  } catch (error) {
    console.error(`Error writing to ${filePath}: ${error.message}`);
  }
}

function calculatePercentage(count) {
  return (count / urls.length) * 100;
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const activities = [];
  let count = 0;

  for (const url of urls) {
    await page.goto(url);

    count++;

    let activity = {
      id: "",
      name: "",
      genre: "",
      activityType: "Tiyatro",
      duration: null,
      thumbnail: "",
      description: "",
      startingDate: new Date(),
      endDate: new Date(),
      tickets: [],
    };

    //activity.nameSlug = await getNameSlug(url);
    activity.name = await getTitle(page);

    console.log(`Activity name : ${activity.name}`);
    console.log(`Percentage : ${calculatePercentage(count)}`);

    activity.thumbnail = await getThumbnail(page);

    const durationResult = await getDuration(page);
    if (durationResult !== null) {
      activity.duration = durationResult;
    }

    activity.genre = await getGenre(page);
    activity.description = await getDescription(page);

    const startingDateResult = await getStartingDate(page);
    if (startingDateResult === null) {
      continue;
    } else {
      activity.startingDate = startingDateResult;
    }

    activity.endDate = await getEndDate(page);

    activity.tickets = await getTickets(page);

    activity.id = uuidv4();

    //console.log(activity);
    activities.push(activity);
  }

  writeArrayToJSONFile(activities);

  await browser.close();
})();
