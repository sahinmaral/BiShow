import { FC, Fragment, useMemo, useState } from "react";

type TheatreDetailTabsProps = {
  description: string;
};

const TheatreDetailTabs: FC<TheatreDetailTabsProps> = ({ description }) => {
  const [selectedTab, setSelectedTab] = useState<string>("description");

  return (
    <Fragment>
      <div className="my-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li className="mr-2" onClick={() => setSelectedTab("description")}>
            <button
              className={`${
                selectedTab !== "description"
                  ? "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  : ""
              } inline-block p-4 border-b-2 rounded-t-lg`}
            >
              Açıklama
            </button>
          </li>
          <li className="mr-2" onClick={() => setSelectedTab("rules")}>
            <button
              className={`${
                selectedTab !== "rules"
                  ? "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  : ""
              } inline-block p-4 border-b-2 rounded-t-lg`}
            >
              Etkinlik Kuralları
            </button>
          </li>
        </ul>
      </div>
      <div>
        <div
          className={`${
            selectedTab !== "description" ? "hidden" : ""
          } p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}
        >
          <p dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
        <div
          className={`${
            selectedTab !== "rules" ? "hidden" : ""
          } p-4 rounded-lg bg-gray-50 dark:bg-gray-800`}
        >
          <p>
            • Gününde ve saatinde kullanılmayan biletler geçersiz olup, bilet
            bedeli ve hizmet bedeli iadesi ve/ veya değişiklik yapılması mümkün
            değildir. Gün ve saatinde kullanılmayan biletlerin iadesi için
            Biletinial’dan talepte bulunulamaz.
            <br />
            • Biletiniz mücbir sebep ya da etkinliğin iptali haricinde herhangi
            bir sebeple kullanılamayacak ise, en geç etkinlik saatinden 48 saat
            önceye kadar, Biletinial ile irtibata geçmenizi rica ederiz, aksi
            takdirde biletinizin iptal işlemi gerçekleştirilememektedir.
            <br />
            • Organizasyon sahibi kurum ve/veya kuruluşlar konser verilecek
            alanlarda ve/veya konser salonlarında oturum düzeni ve planında
            uygun gördüğü durumlarda yer değişikliği yapma hakkına sahiptir.
            <br />
            • Kullanıcı Biletinial üzerinden satın almış olduğu biletler için
            etkinlik için geçerli olan yaş sınırı kurallarına uyduğunu kabul
            eder. Yaş sınırları için satın alınan biletin etkinlik mekanında
            kimlik ibrazı zorunlu olacaktır.
            <br />
            • Etkinliğe ait indirimli bilet tanımı olması ve indirimli bilet
            seçeneği ile bilet satın alınması durumunda Kullanıcı bu indirimli
            bilete tabi olduğu kabul ve tahaahüt eder. İndirimli biletler için
            satın alınan biletin etkinlik mekanında kimlik ibrazı zorunlu
            olacaktır.
            <br />• Etkinlik saatine geç kalınması durumunda Biletinial
            kullanıcının etkinlik mekanına alınması konusunda hiçbir şekilde
            sorumlu değildir.
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default TheatreDetailTabs;
