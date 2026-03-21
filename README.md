# طقوس — مستودع جاهز لـ GitHub وNetlify

هذا المشروع مُعد للنشر على Netlify بصيغة أكثر أمانًا:
- الواجهة موجودة في `site/index.html`
- استدعاءات WeatherAPI تمر عبر `netlify/functions/weather.js`
- مفتاح الطقس لا يُحفظ داخل الواجهة الأمامية
- تمت إضافة `favicon` وصورة مشاركة اجتماعية وملف ترخيص و`.gitignore`

## قبل النشر
أضف متغير البيئة التالي داخل Netlify:

- الاسم: `WEATHER_API_KEY`
- القيمة: مفتاح WeatherAPI الخاص بك

## خطوات النشر على Netlify
1. ارفع هذا المجلد إلى GitHub.
2. في Netlify اختر **Add new project** ثم **Import from Git**.
3. اختر المستودع.
4. سيقرأ Netlify ملف `netlify.toml` تلقائيًا.
5. أضف متغير البيئة `WEATHER_API_KEY` من إعدادات المشروع.
6. نفّذ إعادة نشر للمشروع.

## تشغيل محلي اختياري
يمكنك استخدام Netlify CLI لتجربة الدوال محليًا:

```bash
netlify dev
```

ثم افتح العنوان المحلي الذي يعرضه الطرفية.

## البنية
```text
tqoos-netlify/
├── .gitignore
├── LICENSE
├── README.md
├── netlify.toml
├── netlify/
│   └── functions/
│       └── weather.js
└── site/
    ├── assets/
    │   ├── apple-touch-icon.png
    │   ├── favicon-32.png
    │   ├── favicon.svg
    │   ├── social-preview.png
    │   └── social-preview.svg
    ├── index.html
    └── site.webmanifest
```

## ملاحظات
- صورة المعاينة الاجتماعية موجودة في `site/assets/social-preview.png`.
- الأيقونة موجودة في `site/assets/favicon.svg`.
- الترخيص الافتراضي المضاف هو `MIT` باسم `AHMEDDARRAJ`.
