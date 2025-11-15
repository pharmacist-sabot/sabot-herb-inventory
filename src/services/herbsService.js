const API_URL =
  "https://script.google.com/macros/s/AKfycbxBQYh3SIQAf5ooJDe0LZSgaFJhjXxoicScksTd945VesFHTM9z9oQXlDkhBMYMAKwWCQ/exec";

export default {
  getHerbDataByYear(year) {
    return new Promise((resolve, reject) => {
      const callbackName = "jsonp_callback_" + Math.round(100000 * Math.random());

      // สร้างฟังก์ชันรับข้อมูล
      window[callbackName] = function (data) {
        delete window[callbackName];
        document.body.removeChild(script);

        if (data.status === "success") {
          resolve(data.data);
        } else {
          reject(data.message || "Unknown error");
        }
      };

      // ประกอบ URL
      const url = `${API_URL}?callback=${callbackName}&year=${year}`;

      // โหลดผ่าน <script>
      const script = document.createElement("script");
      script.src = url;
      script.onerror = () => {
        delete window[callbackName];
        reject("JSONP request failed");
      };

      document.body.appendChild(script);
    });
  }
};
