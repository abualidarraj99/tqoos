const BASE_URL = "https://api.weatherapi.com/v1";

function json(body, statusCode = 200, cacheControl = "public, max-age=120") {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": cacheControl
    },
    body: JSON.stringify(body)
  };
}

exports.handler = async function (event) {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
      return json(
        { error: "WEATHER_API_KEY غير مضبوط في إعدادات Netlify." },
        500,
        "no-store"
      );
    }

    const qs = event.queryStringParameters || {};
    const type = String(qs.type || "forecast").trim();
    const q = String(qs.q || "").trim();

    if (!q) {
      return json({ error: "المعامل q مطلوب." }, 400, "no-store");
    }

    let upstreamUrl;
    let cacheControl = "public, max-age=120";

    if (type === "forecast") {
      const requestedDays = parseInt(qs.days, 10);
      const days = Number.isFinite(requestedDays)
        ? Math.min(14, Math.max(1, requestedDays))
        : 7;

      upstreamUrl = `${BASE_URL}/forecast.json?key=${encodeURIComponent(apiKey)}&q=${encodeURIComponent(q)}&days=${days}&aqi=yes&alerts=yes&lang=ar`;
    } else if (type === "search") {
      upstreamUrl = `${BASE_URL}/search.json?key=${encodeURIComponent(apiKey)}&q=${encodeURIComponent(q)}`;
      cacheControl = "public, max-age=300";
    } else {
      return json({ error: "نوع الطلب غير مدعوم." }, 400, "no-store");
    }

    const response = await fetch(upstreamUrl, {
      headers: {
        "Accept": "application/json"
      }
    });

    const text = await response.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch (_) {
      return json({ error: "استجابة غير مفهومة من WeatherAPI." }, 502, "no-store");
    }

    if (!response.ok || data?.error) {
      const message = data?.error?.message || "فشل الاتصال بخدمة WeatherAPI.";
      return json({ error: message }, response.status || 502, "no-store");
    }

    return json(data, 200, cacheControl);
  } catch (error) {
    return json(
      { error: error?.message || "حدث خطأ غير متوقع داخل دالة Netlify." },
      500,
      "no-store"
    );
  }
};
