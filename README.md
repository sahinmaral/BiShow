# BiShow

## Unutkan bir aktivist için yol arkadaşı sağlayacak uygulama

Bu uygulama , biletinial.com üzerindeki verilerin `data scraping` yöntemi ile alınarak veri öbeği oluşturulmuş ve bu veri öbekleri ile kullanıcı yönetimi popüler BaaS hizmetlerinden biri olan Google Firebase ile sağlanmıştır.
Canlı link : https://bi-show.vercel.app/

Veri öbeği şu anlık sadece biletinial.com sitesi üzerinde aktivite türü tiyatrolardır. Aktivitelerin modellenmesi şu şekildedir :

```javascript
{
    id:string,
    name:string,
    activityType:string,
    description:string,
    duration:string | null,
    genre:string,
    startingDate:string,
    endDate:string,
    rating: [
        {
            userId:string;
            ratingPoint:number;
        }
    ],
    tickets: [
        city : string,
        seances : [
            {
                id:string,
                isSoldOut:boolean,
                startDate:string,
                endDate:string,
                url:string,
                location: {
                    address:string,
                    name:string,
                    nameSlug:string
                }
            }
        ]
    ]
}
```

Kullanıcıların modellenmesi şu şekildedir :
```javascript
{
    email:string;
    firstName:string;
    lastName:string;
    photoUrl:string;
    theme?:string | undefined;
}
```

Eğer kullanıcı bir bileti kaydettiyse bunun modellenmesi ise şu şekildedir :

```javascript
{
    activityId:string;
    seanceId:string;
    userId:string;
}
```

Uygulama üzerindeki sayfalar ve açıklamaları şu şekildedir :
- Anasayfa
    - Anasayfa üzerinde rating puanına göre popüler olan ilk 10 aktiviteler gösterilmektedir.
- Aktivite Showroom
    - Sayfa içerisinde yüklenen verilere göre şehir , mekan , tür ve tarih bilgilerine göre filtreleme yapabileceğiniz alan mevcuttur. Aşağı doğru kaydırıldığında veriler yirmişer şeklinde yüklenmektedir.
- Aktivite Detay
    - Aktivitenin hangi şehirlerde gösterime çıktığı , kesin bir gösterim süresi varsa gösterim süresi , türü , başlangıç ve bitiş tarihleri , açıklaması ve puanlama sistemi mevcuttur.
    - Şehirlere göre tarihi geçmemiş ve seans yeri dolmamış biletler üzerinden biletinial.com üzerinden biletinizi alabilirsiniz. Eğer kullanıcı giriş yapmışsa bileti aldıktan sonra tekrardan uygulamaya geri dönerek bileti kaydedebilir
    - Aktivitenin süresi geçmişse sistemde yine de yer almaktadır fakat aktivite showroom üzerinden gözükmemektedir.
    - Aktivitenin türüyle aynı olan altı tane aktivite de aşağıda gösterilmektedir.
- Ayarlar
    - Kullanıcı eğer giriş yapmışsa tema ve şifre güncellemesi yapabilir
- Satın Alınan Biletler
    - Kullanıcı satın almaya karar vermiş aktiviteleri kaydettiği bilgileri burada detaylı bir şekilde görüntülenmektedir.
