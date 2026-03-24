import { memo } from 'react'
import type { Language } from '../../i18n'
import { L } from '../../i18n'

interface FooterProps {
  lang: Language
}

export const Footer = memo(function Footer({ lang }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-privacy">
        <span className="privacy-icon">🔒</span>
        {(() => {
          const onnxLink = <a href="https://www.npmjs.com/package/onnxruntime-web" target="_blank" rel="noopener noreferrer">ONNX Web Runtime</a>
          if (lang === 'ja') return <span>このシステムは {onnxLink} 技術を使用しており、Webブラウザで完結して動作します。選択した画像とOCR結果はあなたのPCの外部には送信されません。</span>
          if (lang === 'zh-CN') return <span>该系统使用 {onnxLink} 技术，完全在Web浏览器中运行。您选择的图像和OCR结果不会发送到PC外部。</span>
          if (lang === 'zh-TW') return <span>該系統使用 {onnxLink} 技術，完全在Web瀏覽器中運行。您選擇的圖像和OCR結果不會傳送到PC外部。</span>
          if (lang === 'ko') return <span>이 시스템은 {onnxLink} 기술을 사용하며 웹 브라우저에서 완전히 실행됩니다. 선택한 이미지와 OCR 결과는 PC 외부로 전송되지 않습니다.</span>
          if (lang === 'la') return <span>Hoc systema technologia {onnxLink} utitur et in navigatro interretiali operatur. Imagines selectae et eventus OCR extra computatrum tuum non mittuntur.</span>
          if (lang === 'eo') return <span>Ĉi tiu sistemo uzas {onnxLink} kaj funkcias tute en via retumilo. Elektitaj bildoj kaj OCR-rezultoj neniam estas senditaj ekster via komputilo.</span>
          if (lang === 'es') return <span>Este sistema usa {onnxLink} y funciona completamente en su navegador. Las imágenes y los resultados OCR nunca se envían a ningún servidor externo.</span>
          if (lang === 'de') return <span>Dieses System nutzt {onnxLink} und läuft vollständig in Ihrem Browser. Ausgewählte Bilder und OCR-Ergebnisse werden niemals an einen externen Server gesendet.</span>
          if (lang === 'ar') return <span>يستخدم هذا النظام تقنية {onnxLink} ويعمل بالكامل في متصفحك. لا يتم إرسال الصور المحددة ونتائج OCR إلى أي خادم خارجي.</span>
          if (lang === 'hi') return <span>यह सिस्टम {onnxLink} तकनीक का उपयोग करता है और पूरी तरह आपके ब्राउज़र में चलता है। चयनित छवियाँ और OCR परिणाम कभी किसी बाहरी सर्वर पर नहीं भेजे जाते।</span>
          if (lang === 'ru') return <span>Эта система использует {onnxLink} и работает полностью в вашем браузере. Выбранные изображения и результаты OCR никогда не отправляются на внешний сервер.</span>
          if (lang === 'el') return <span>Αυτό το σύστημα χρησιμοποιεί {onnxLink} και λειτουργεί εξ ολοκλήρου στο πρόγραμμα περιήγησής σας. Οι επιλεγμένες εικόνες και τα αποτελέσματα OCR δεν αποστέλλονται ποτέ σε εξωτερικό διακομιστή.</span>
          if (lang === 'syc') return <span>ܗܢ ܫܘ̈ܠܛ̈ܢ {onnxLink} ܢ̇ܦ̈ܩ ܘ̇ܟ̈ܠ̈ܗ ܒ̈ܡ̈ܕ̈ܒ̈ܪ̈ܢ̈ܐ ܕ̈ܝ̈ܠ̈ܟ ܦ̈ܥ̈ܠ. ܨ̈ܘ̈ܪ̈ܬ̈ܐ ܘ̈ܦ̈ܠ̈ܛ̈ܐ ܕ OCR ܠ̈ܒ̈ܪ ܡ̈ܢ ܡ̈ܚ̈ܫ̈ܒ̈ܬ̈ܟ ܠ̈ܐ ܡ̈ܫ̈ܬ̈ܕ̈ܪ̈ܝ̈ܢ.</span>
          if (lang === 'cop') return <span>ⲡⲁⲓⲥⲩⲥⲧⲏⲙⲁ ⲉϥⲭⲣⲱ ⲙ {onnxLink} ⲟⲩⲟϩ ⲉϥⲉⲣϩⲱⲃ ⲧⲏⲣϥ ϧⲉⲛ ⲡⲉⲕⲃⲣⲁⲩⲥⲉⲣ. ⲛⲓⲉⲓⲕⲱⲛ ⲛⲉⲙ ⲛⲓⲡⲟⲗⲏ ⲛⲧⲉ OCR ⲛⲁⲩⲟⲩⲟⲣⲡⲟⲩ ⲉⲃⲟⲗ ⲁⲛ.</span>
          if (lang === 'sa') return <span>एतत् प्रणालिका {onnxLink} प्रौद्योगिकीं प्रयुङ्क्ते, सम्पूर्णतया भवतः ब्राउज़रे चलति। चित्राणि OCR-फलानि च बाह्यसेवकाय न प्रेष्यन्ते।</span>
          return <span>This system uses {onnxLink} and runs entirely in your browser. Selected images and OCR results are never sent to any external server.</span>
        })()}
      </div>
      <div className="footer-attribution">
        {(() => {
          const ndlocrLink = <a href="https://github.com/ndl-lab/ndlocr-lite" target="_blank" rel="noopener noreferrer">NDLOCR-Lite</a>
          const hashimotoLink = <a href="https://github.com/yuta1984/ndlocrlite-web" target="_blank" rel="noopener noreferrer">{L(lang, { ja: '橋本雄太', en: 'Yuta Hashimoto', 'zh-CN': '桥本雄太', 'zh-TW': '橋本雄太', ko: '하시모토 유타', la: 'Yuta Hashimoto', eo: 'Yuta Hashimoto', es: 'Yuta Hashimoto', de: 'Yuta Hashimoto', ar: 'يوتا هاشيموتو', hi: 'युता हाशिमोतो', ru: 'Юта Хашимото', el: 'Yuta Hashimoto', syc: 'Yuta Hashimoto', cop: 'Yuta Hashimoto', sa: 'Yuta Hashimoto' })}</a>
          const ogataLink = <a href="https://github.com/ogwata/ndlocr-lite-web-ai" target="_blank" rel="noopener noreferrer">{L(lang, { ja: '小形克宏', en: 'Katsuhiro Ogata', 'zh-CN': '小形克宏', 'zh-TW': '小形克宏', ko: '오가타 가쓰히로', la: 'Katsuhiro Ogata', eo: 'Katsuhiro Ogata', es: 'Katsuhiro Ogata', de: 'Katsuhiro Ogata', ar: 'كاتسوهيرو أوغاتا', hi: 'कात्सुहिरो ओगाटा', ru: 'Кацухиро Огата', el: 'Katsuhiro Ogata', syc: 'Katsuhiro Ogata', cop: 'Katsuhiro Ogata', sa: 'Katsuhiro Ogata' })}</a>
          const miyagawaLink = <a href="https://researchmap.jp/SoMiyagawa" target="_blank" rel="noopener noreferrer">{L(lang, { ja: '宮川創', en: 'So Miyagawa', 'zh-CN': '宫川创', 'zh-TW': '宮川創', ko: '미야가와 소', la: 'So Miyagawa', eo: 'So Miyagawa', es: 'So Miyagawa', de: 'So Miyagawa', ar: 'سو مياغاوا', hi: 'सो मियागावा', ru: 'Со Миягава', el: 'So Miyagawa', syc: 'So Miyagawa', cop: 'So Miyagawa', sa: 'So Miyagawa' })}</a>

          if (lang === 'ja') return (
            <span className="footer-attribution-text">
              本ツールは、国立国会図書館（NDL Lab）が開発した {ndlocrLink} を{hashimotoLink}氏がWebブラウザ版にし、{ogataLink}氏がAI校正機能を付け、{miyagawaLink}がカメラ機能や画像補正機能、奇妙なデザインなど様々な蛇足な機能を施したものです。
            </span>
          )
          if (lang === 'zh-CN') return (
            <span className="footer-attribution-text">
              本工具基于日本国立国会图书馆（NDL Lab）开发的 {ndlocrLink}，由{hashimotoLink}制作Web浏览器版本，{ogataLink}添加了AI校正功能，{miyagawaLink}添加了相机功能、图像校正以及各种多余的功能。
            </span>
          )
          if (lang === 'zh-TW') return (
            <span className="footer-attribution-text">
              本工具基於日本國立國會圖書館（NDL Lab）開發的 {ndlocrLink}，由{hashimotoLink}製作Web瀏覽器版本，{ogataLink}添加了AI校正功能，{miyagawaLink}添加了相機功能、影像校正以及各種多餘的功能。
            </span>
          )
          if (lang === 'ko') return (
            <span className="footer-attribution-text">
              이 도구는 일본 국립국회도서관(NDL Lab)이 개발한 {ndlocrLink}을 {hashimotoLink}이 웹 브라우저 버전으로 만들고, {ogataLink}이 AI 교정 기능을 추가하고, {miyagawaLink}이 카메라 기능, 이미지 보정, 기묘한 디자인 등 다양한 사족 기능을 추가한 것입니다.
            </span>
          )
          if (lang === 'la') return (
            <span className="footer-attribution-text">
              Hoc instrumentum in {ndlocrLink} a Bibliotheca Nationali Diaetae Iaponiae (NDL Lab) elaborata fundatur. {hashimotoLink} versionem navigatri interretialis fecit, {ogataLink} correctionem AI addidit, et {miyagawaLink} functionem camerae, correctionem imaginum aliaque varia additamenta superflua adiecit.
            </span>
          )
          if (lang === 'eo') return (
            <span className="footer-attribution-text">
              Ĉi tiu ilo baziĝas sur {ndlocrLink} evoluigita de la Nacia Dieta Biblioteko de Japanio (NDL Lab). {hashimotoLink} faris la retumilan version, {ogataLink} aldonis AI-korektadon, kaj {miyagawaLink} aldonis kameran funkcion, bildkorekton kaj diversajn superfluajn funkciojn.
            </span>
          )
          if (lang === 'es') return (
            <span className="footer-attribution-text">
              Esta herramienta se basa en {ndlocrLink} desarrollado por la Biblioteca Nacional de la Dieta de Japón (NDL Lab). {hashimotoLink} creó la versión web, {ogataLink} añadió la corrección con IA, y {miyagawaLink} añadió la función de cámara, la corrección de imágenes y diversas funciones superfluas.
            </span>
          )
          if (lang === 'de') return (
            <span className="footer-attribution-text">
              Dieses Tool basiert auf {ndlocrLink}, entwickelt von der Nationalbibliothek des japanischen Parlaments (NDL Lab). {hashimotoLink} erstellte die Webbrowser-Version, {ogataLink} fügte die KI-Korrektur hinzu, und {miyagawaLink} fügte die Kamerafunktion, Bildkorrektur und diverse überflüssige Funktionen hinzu.
            </span>
          )
          if (lang === 'ar') return (
            <span className="footer-attribution-text">
              تستند هذه الأداة إلى {ndlocrLink} التي طورتها المكتبة الوطنية للبرلمان الياباني (NDL Lab). قام {hashimotoLink} بإنشاء نسخة متصفح الويب، وأضاف {ogataLink} وظيفة التصحيح بالذكاء الاصطناعي، وأضاف {miyagawaLink} وظيفة الكاميرا وتصحيح الصور ومختلف الوظائف الزائدة.
            </span>
          )
          if (lang === 'hi') return (
            <span className="footer-attribution-text">
              यह टूल जापान की राष्ट्रीय संसद पुस्तकालय (NDL Lab) द्वारा विकसित {ndlocrLink} पर आधारित है। {hashimotoLink} ने वेब ब्राउज़र संस्करण बनाया, {ogataLink} ने AI प्रूफ़रीडिंग जोड़ी, और {miyagawaLink} ने कैमरा फ़ंक्शन, छवि सुधार और विभिन्न अतिरिक्त कार्यक्षमताएँ जोड़ीं।
            </span>
          )
          if (lang === 'ru') return (
            <span className="footer-attribution-text">
              Этот инструмент основан на {ndlocrLink}, разработанном Национальной библиотекой парламента Японии (NDL Lab). {hashimotoLink} создал версию для веб-браузера, {ogataLink} добавил функцию корректуры с ИИ, а {miyagawaLink} добавил функцию камеры, коррекцию изображений и различные излишние функции.
            </span>
          )
          if (lang === 'el') return (
            <span className="footer-attribution-text">
              Αυτό το εργαλείο βασίζεται στο {ndlocrLink} που αναπτύχθηκε από την Εθνική Βιβλιοθήκη του Κοινοβουλίου της Ιαπωνίας (NDL Lab). Ο {hashimotoLink} δημιούργησε την έκδοση για πρόγραμμα περιήγησης, ο {ogataLink} πρόσθεσε τη διόρθωση AI, και ο {miyagawaLink} πρόσθεσε τη λειτουργία κάμερας, τη διόρθωση εικόνας και διάφορες περιττές λειτουργίες.
            </span>
          )
          if (lang === 'syc') return (
            <span className="footer-attribution-text">
              ܗܢ ܡܐܢ ܥܠ {ndlocrLink} ܕ̇ܣ̈ܝ̈ܡ ܡ̈ܢ ܒ̈ܝ̈ܬ ܐ̈ܪ̈ܟ̈ܐ ܐ̈ܘ̈ܡ̈ܬ̈ܢ̈ܝ̈ܐ ܕ̈ܦ̈ܪ̈ܠ̈ܡ̈ܢ ܕ̈ܝ̈ܦ̈ܘ̈ܢ (NDL Lab). {hashimotoLink} ܣ̈ܡ ܙ̈ܢ̈ܐ ܕ̈ܡ̈ܕ̈ܒ̈ܪ̈ܢ̈ܐ، {ogataLink} ܐ̈ܘ̈ܣ̈ܦ ܬ̈ܘ̈ܪ̈ܨ̈ܐ ܕ AI، ܘ {miyagawaLink} ܐ̈ܘ̈ܣ̈ܦ ܥ̈ܒ̈ܕ̈ܐ ܕ̈ܟ̈ܡ̈ܝ̈ܪ̈ܐ ܘ̈ܬ̈ܘ̈ܪ̈ܨ̈ ܨ̈ܘ̈ܪ̈ܬ̈ܐ ܘ̈ܫ̈ܪ̈ܟ̈ܐ.
            </span>
          )
          if (lang === 'cop') return (
            <span className="footer-attribution-text">
              ⲡⲁⲓⲉⲣⲅⲁⲗⲓⲟⲛ ⲉϥⲕⲏⲧ ⲉϫⲉⲛ {ndlocrLink} ⲉⲧⲁⲩⲑⲁⲙⲓⲟϥ ⲉⲃⲟⲗ ϩⲓⲧⲉⲛ NDL Lab. {hashimotoLink} ⲁϥⲑⲁⲙⲓⲟ ⲙⲡⲓⲃⲣⲁⲩⲥⲉⲣ, {ogataLink} ⲁϥⲟⲩⲱϩ ⲙⲡⲓⲥⲟⲩⲧⲉⲛ ⲛⲧⲉ AI, ⲟⲩⲟϩ {miyagawaLink} ⲁϥⲟⲩⲱϩ ⲙⲡⲓⲕⲁⲙⲉⲣⲁ ⲛⲉⲙ ⲡⲓⲥⲟⲩⲧⲉⲛ ⲛⲛⲓⲉⲓⲕⲱⲛ ⲛⲉⲙ ϩⲁⲛⲕⲉⲟⲩⲁⲓ ⲉⲩⲟⲓ.
            </span>
          )
          if (lang === 'sa') return (
            <span className="footer-attribution-text">
              एतत् उपकरणं जापान-राष्ट्रीय-संसद्-पुस्तकालयेन (NDL Lab) विकसितस्य {ndlocrLink} आधारितम्। {hashimotoLink} वेब-ब्राउज़र-संस्करणम् अकरोत्, {ogataLink} AI-संशोधनं योजयामास, {miyagawaLink} च छायाग्रहण-क्रियां चित्र-संशोधनं विविधानि अतिरिक्तानि कार्याणि च योजयामास।
            </span>
          )
          return (
            <span className="footer-attribution-text">
              This tool is based on {ndlocrLink} developed by the National Diet Library of Japan (NDL Lab). {hashimotoLink} created the web browser version, {ogataLink} added AI proofreading, and {miyagawaLink} added camera functionality, image correction, and various other superfluous features.
            </span>
          )
        })()}
      </div>
      <div className="footer-frog-credit">
        {(() => {
          const link = <a href="https://researchmap.jp/blue0620" target="_blank" rel="noopener noreferrer">{L(lang, {
            ja: '青池亨',
            en: 'Toru Aoike',
            'zh-CN': '青池亨',
            'zh-TW': '青池亨',
            ko: '아오이케 토오루',
            la: 'Tōru Aoike',
            eo: 'Tōru Aoike',
            es: 'Toru Aoike',
            de: 'Toru Aoike',
            ar: 'تورو أويكي',
            hi: 'तोरु आओइके',
            ru: 'Тору Аойке',
            el: 'Toru Aoike',
            syc: 'Toru Aoike',
            cop: 'Toru Aoike',
            sa: 'Toru Aoike'
          })}</a>
          if (lang === 'ja') return <>🐸 背景の鳥獣戯画模様は NDLOCR 開発者・{link}先生へのオマージュです</>
          if (lang === 'zh-CN') return <>🐸 背景的鸟兽戏画图案是向NDLOCR开发者{link}先生致敬</>
          if (lang === 'zh-TW') return <>🐸 背景的鳥獸戲畫圖案是向NDLOCR開發者{link}先生致敬</>
          if (lang === 'ko') return <>🐸 배경의 조수희화 패턴은 NDLOCR 개발자 {link}에 대한 오마주입니다</>
          if (lang === 'la') return <>🐸 Exemplar Choju-giga in fundo est honorarium {link}, creatori NDLOCR</>
          if (lang === 'eo') return <>🐸 La Choju-giga fona ŝablono estas omaĝo al {link}, kreinto de NDLOCR</>
          if (lang === 'es') return <>🐸 El patrón de fondo Choju-giga es un tributo a {link}, desarrollador de NDLOCR</>
          if (lang === 'de') return <>🐸 Das Choju-giga-Hintergrundmuster ist eine Hommage an {link}, Entwickler von NDLOCR</>
          if (lang === 'ar') return <>🐸 نمط خلفية Choju-giga هو تكريم لـ {link}، مطور NDLOCR</>
          if (lang === 'hi') return <>🐸 Choju-giga पृष्ठभूमि पैटर्न {link}, NDLOCR के डेवलपर को श्रद्धांजलि है</>
          if (lang === 'ru') return <>🐸 Узор Choju-giga на фоне — это дань уважения {link}, разработчику NDLOCR</>
          if (lang === 'el') return <>🐸 Το μοτίβο Choju-giga στο φόντο αποτελεί φόρο τιμής στον {link}, δημιουργό του NDLOCR</>
          if (lang === 'syc') return <>🐸 ܨܘ̈ܪ̈ܬ Choju-giga ܒ̈ܦ̈ܢ̈ܝ̈ܬ̈ܐ ܐ̈ܝ̈ܩ̈ܪ̈ ܠ {link}، ܒ̈ܪ̈ܘ̈ܝ̈ NDLOCR</>
          if (lang === 'cop') return <>🐸 ⲡⲓⲥⲭⲏⲙⲁ ⲛⲧⲉ Choju-giga ϧⲉⲛ ⲡⲓⲕⲁϩⲓ ⲟⲩⲧⲁⲓⲟ ⲛ {link}, ⲫⲏ ⲉⲧⲁϥⲑⲁⲙⲓⲟ ⲙ NDLOCR</>
          if (lang === 'sa') return <>🐸 पृष्ठभूमौ Choju-giga प्रतिरूपं {link} NDLOCR विकासकस्य सम्मानार्थम् अस्ति</>
          return <>🐸 The Choju-giga background pattern is a tribute to {link}, developer of NDLOCR</>
        })()}
      </div>
    </footer>
  )
})
