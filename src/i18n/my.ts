import type { Translations } from './ja'

export const my: Translations = {
  app: { title: 'NDL(Kotenseki)OCR-lite Web', subtitle: 'ဘရောက်ဆာတွင် ဂျပန် OCR ကိရိယာ' },
  upload: {
    dropzone: 'ဖိုင်များကို ဤနေရာသို့ ဆွဲထည့်ပါ သို့မဟုတ် ရွေးချယ်ရန် နှိပ်ပါ',
    directoryButton: 'ဖိုဒါရွေးချယ်ပါ',
    acceptedFormats: 'ပံ့ပိုးသော ဖိုင်အမျိုးအစား: JPG, PNG, PDF',
    startButton: 'OCR စတင်ပါ',
    clearButton: 'ရှင်းလင်းပါ',
  },
  progress: {
    initializing: 'စတင်နေသည်...', loadingLayoutModel: 'အပြင်အဆင် မော်ဒယ် တင်နေသည်... {percent}%',
    loadingRecognitionModel: 'အသိအမှတ်ပြု မော်ဒယ် တင်နေသည်... {percent}%',
    layoutDetection: 'စာသား နယ်ပယ်များ ရှာဖွေနေသည်... {percent}%',
    textRecognition: 'စာသား အသိအမှတ်ပြုနေသည် ({current}/{total} နယ်ပယ်)',
    readingOrder: 'ဖတ်ရှုအစီအစဉ် လုပ်ဆောင်နေသည်...',
    generatingOutput: 'ရလဒ် ထုတ်လုပ်နေသည်...', processing: 'လုပ်ဆောင်နေသည်: {current}/{total} ဖိုင်',
    done: 'ပြီးပါပြီ',
  },
  results: {
    copy: 'ကူးယူ', download: 'ဒေါင်းလုဒ်', downloadAll: 'စာသားအားလုံး ဒေါင်းလုဒ်',
    copied: 'ကူးယူပြီး!', noResult: 'ရလဒ်မရှိပါ', regions: 'နယ်ပယ် {count} ခု',
    processingTime: 'လုပ်ဆောင်ချိန်: {time}စက္ကန့်',
  },
  history: {
    title: 'မှတ်တမ်း', clearCache: 'ကက်ရှ် ရှင်းလင်း', confirmClear: 'လုပ်ဆောင်မှု မှတ်တမ်းအားလုံး ဖျက်မလား?',
    yes: 'ဖျက်ပါ', cancel: 'မလုပ်တော့ပါ', empty: 'မှတ်တမ်းမရှိပါ', noText: 'စာသားမရှိပါ',
  },
  settings: {
    title: 'ဆက်တင်', modelCache: 'မော်ဒယ် ကက်ရှ်', clearModelCache: 'မော်ဒယ် ကက်ရှ် ရှင်းလင်း',
    confirmClearModel: 'သိမ်းထားသော ONNX မော်ဒယ်များ ဖျက်မလား? နောက်တစ်ကြိမ် ဖွင့်သောအခါ ပြန်ဒေါင်းလုဒ်လုပ်ပါမည်။',
    clearDone: 'ရှင်းလင်းပြီး',
  },
  info: {
    privacyNotice: 'ဤအက်ပ်သည် ဘရောက်ဆာတွင် အပြည့်အဝ အလုပ်လုပ်ပါသည်။ ရုပ်ပုံဖိုင်များနှင့် OCR ရလဒ်များကို ပြင်ပဆာဗာသို့ မပို့ပါ။',
    author: 'ဖန်တီးသူ: Yuta Hashimoto (National Museum of Japanese History / National Diet Library)',
    githubLink: 'GitHub သိုလှောင်ခန်း',
  },
  language: { switchTo: '日本語' },
  error: {
    generic: 'အမှားတစ်ခု ဖြစ်ပွားခဲ့သည်', modelLoad: 'မော်ဒယ် တင်၍မရပါ', ocr: 'OCR လုပ်ဆောင်ရာတွင် အမှား',
    fileLoad: 'ဖိုင် တင်၍မရပါ', clipboardNotSupported: 'ကလစ်ဘုတ် ဝင်ရောက်၍မရပါ',
  },
  tooltip: { dragPageReorder: 'အစီအစဉ် ပြောင်းရန် ဆွဲပါ' },
}
