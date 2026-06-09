import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  User, 
  BookOpen, 
  Layers, 
  Sliders, 
  FileText, 
  Video, 
  Image as ImageIcon, 
  RefreshCw, 
  Download, 
  HelpCircle, 
  Compass, 
  Heart, 
  History, 
  Users, 
  ExternalLink,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Info,
  Play,
  Pause,
  Maximize2,
  VolumeX,
  Volume2,
  ChevronLeft,
  Copy
} from 'lucide-react';

const CATEGORIES = [
  {
    id: 'fiqh',
    title: 'Fiqh & Ibadah Praktis',
    desc: 'Fokus pada akurasi gerakan, kebersihan pakaian, dan detail shot (medium/close-up).',
    icon: Compass,
    color: 'border-emerald-500 text-emerald-600 bg-emerald-50/50',
    badge: 'Akurasi Gerakan & Syariat',
    themePlaceholder: 'Cara Shalat Witir, Syarat Sah Puasa, Thaharah Praktis'
  },
  {
    id: 'akhlak',
    title: 'Akhlak & Motivasi Islami',
    desc: 'Menonjolkan ekspresi teduh, soft lighting, dan suasana kontemplatif/menenang.',
    icon: Heart,
    color: 'border-rose-500 text-rose-600 bg-rose-50/50',
    badge: 'Ekspresi Teduh & Soft Lighting',
    themePlaceholder: 'Mengatasi Overthinking dalam Islam, Keutamaan Senyum, Self-Healing lewat Doa'
  },
  {
    id: 'sejarah',
    title: 'Sejarah & Sirah Nabawiyah',
    desc: 'Gaya sinematik dramatis, ilustrasi epik, detail latar belakang masa lalu/padang pasir.',
    icon: History,
    color: 'border-amber-600 text-amber-700 bg-amber-50/50',
    badge: 'Sinematik & Dramatis',
    themePlaceholder: 'Kisah Heroik Mus\'ab bin Umair, Keberanian Khalid bin Walid'
  },
  {
    id: 'muamalah',
    title: 'Muamalah & Isu Sosial',
    desc: 'Latar modern perkotaan (urban), relevan dengan aktivitas harian mahasiswa & dunia digital.',
    icon: Users,
    color: 'border-blue-500 text-blue-600 bg-blue-50/50',
    badge: 'Modern & Urban Relatable',
    themePlaceholder: 'Hukum Paylater Bagi Mahasiswa, Adab Sosial Media, Kerja Sampingan Halal'
  }
];

const TALENT_PRESETS = [
  {
    name: "Ustadz Muda KPI",
    description: "Mahasiswa laki-laki berumur 21 tahun, berwajah ramah khas Indonesia, mengenakan jas almamater hijau tua rapi, kemeja putih, dan peci hitam polos. Ekspresi tersenyum hangat."
  },
  {
    name: "Mahasiswi Aktivis Dakwah",
    description: "Mahasiswi berhijab berumur 20 tahun, mengenakan jilbab segi empat lebar berwarna pastel hangat, berwajah teduh dan cerdas, memakai pin logo kampus di kerudungnya. Ekspresi fokus mencerahkan."
  },
  {
    name: "Kreator Kasual Gen-Z",
    description: "Pemuda Muslim berumur 19 tahun, berpenampilan kasual trendi, mengenakan hoodie earth-tone dan jam tangan minimalis. Ekspresi santai, komunikatif, dan ekspresif."
  }
];

const safeCopyToClipboard = (text) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.width = '2em';
  textarea.style.height = '2em';
  textarea.style.padding = '0';
  textarea.style.border = 'none';
  textarea.style.outline = 'none';
  textarea.style.boxShadow = 'none';
  textarea.style.background = 'transparent';
  
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  
  let success = false;
  try {
    success = document.execCommand('copy');
  } catch (err) {
    console.warn('execCommand copy failed:', err);
  }
  document.body.removeChild(textarea);

  if (success) {
    return true;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => {
        // Succeeded asynchronously
      })
      .catch((err) => {
        console.warn('Modern Clipboard API blocked by security policy:', err);
      });
  }

  return false;
};

const getFallbackPrompt = (inputs) => {
  const { talent, category, theme, audience, setting, tone } = inputs;
  
  let imagePrompt = "";
  let explanation = "";
  let storyboard = [];
  let takeaway = "";

  if (category === 'fiqh') {
    imagePrompt = `A high-quality, authentic photography of ${talent}. Set in a ${setting} with a clean and sacred atmosphere. Shot in a precise Medium Close-Up to focus on the proper posture, showing clean folded hands or precise alignment of prayer. The lighting is ${tone === 'warm' ? 'warm and focused, cinematic soft key light' : tone === 'cool' ? 'calm, soft-focus natural daylight' : 'highly dramatic studio lighting with dark rich background shadow'}. Superb details on the clean texture of Islamic attire, prayer mat, and respectful expressions. 8k resolution, cinematic composition, photorealistic, Midjourney style.`;
    
    explanation = "Prompt ini berfokus penuh pada kejelasan dan akurasi visual gerakan fiqih. Detail posisi tangan dan kebersihan pakaian ditonjolkan untuk menjaga keabsahan syariat visual tanpa distorsi estetika berlebih.";
    
    storyboard = [
      { sceneNum: 1, cameraAngle: "Medium Shot (Eye Level)", talentMovement: "Talent berdiri tegak menghadap kamera dengan tenang, melakukan gerakan takbiratul ihram secara perlahan dan presisi.", onScreenText: "FIQH PRAKTIS: SERING KELIRU?", audioVoiceover: "Teman-teman KPI, gerakan ibadah harian kita udah beneran sesuai sunnah belum? Yuk kita bedah singkat!", visualAmbiance: `${setting} dengan nuansa warna ${tone}.` },
      { sceneNum: 2, cameraAngle: "Close-up (Angle Rendah)", talentMovement: "Kamera menyorot presisi letak tangan di dada (bersedekap) atau posisi sujud yang benar.", onScreenText: "Fokus Posisi Tangan & Lutut", audioVoiceover: "Dalam riwayat shahih, posisi tangan bersedekap di atas dada, bukan terlalu ke bawah atau terlalu ke atas. Perhatikan detail ini ya!", visualAmbiance: "Detail pencahayaan tajam agar posisi tubuh terlihat jelas." },
      { sceneNum: 3, cameraAngle: "Medium Close-up", talentMovement: "Talent tersenyum ramah dan memberikan isyarat jempol santai sebagai penutup.", onScreenText: "Share & Amalkan!", audioVoiceover: "Sederhana tapi krusial banget buat keabsahan shalat kita. Share video ini ke grup kelas kalian ya!", visualAmbiance: "Pencahayaan terang benderang yang bersih." }
    ];
    takeaway = "Ibadah yang diterima dimulai dari ilmu yang presisi dan keikhlasan hati.";
  } 
  else if (category === 'akhlak') {
    imagePrompt = `A beautiful, atmospheric and heart-warming portrait of ${talent}. Standing in a serene ${setting}, bathed in extremely soft, gentle golden-hour ${tone === 'warm' ? 'warm lighting, light leaks, dust motes floating' : 'cool blue morning mist light'}. Expression is deeply contemplative, calm, filled with peace (Sakinah), eyes expressing gentle empathy and self-healing. Highly aesthetic, organic textures, cinematic realism, shot on 85mm lens, f/1.4, cozy peaceful mood.`;
    
    explanation = "Visual didesain dengan pencahayaan super lembut (soft lighting) dan ekspresi wajah yang tenang untuk memicu perasaan damai, cocok dengan konten penenang hati (self-healing) dan pereda overthinking.";
    
    storyboard = [
      { sceneNum: 1, cameraAngle: "Extreme Close-Up", talentMovement: "Talent menutup mata sejenak, menarik napas dalam, lalu membuka mata perlahan menatap kamera dengan senyuman teduh.", onScreenText: "Lagi Overthinking?", audioVoiceover: "Pernah gak sih, malam-malam pikiranmu gaduh banget? Khawatir masa depan, takut gak lulus, atau cemas urusan dunia?", visualAmbiance: `${setting} dengan pencahayaan soft/warm.` },
      { sceneNum: 2, cameraAngle: "Medium Shot", talentMovement: "Talent berjalan pelan atau duduk santai sembari memegang mushaf atau menengadahkan tangan berdoa dengan tulus.", onScreenText: "Cukupkan dengan Doa", audioVoiceover: "Allah bilang, cukuplah Allah bagi kita. Letakkan semua beban pikiranmu di atas sajadah, kawan. Serahkan semuanya.", visualAmbiance: "Latar belakang bokeh yang sangat menenangkan." },
      { sceneNum: 3, cameraAngle: "Close-up", talentMovement: "Talent menatap kamera dengan binar mata optimis dan senyum tulus yang menenangkan.", onScreenText: "Tenang, Ada Allah", audioVoiceover: "Istirahatlah malam ini dengan hati yang tenang. Kamu tidak sendirian. Allah bersamamu.", visualAmbiance: "Visual memudar perlahan (fade to warm golden light)." }
    ];
    takeaway = "Menghidupkan rasa tenang (Tuma'ninah) melalui tawakal penuh kepada ketetapan Allah.";
  }
  else if (category === 'sejarah') {
    imagePrompt = `A dramatic cinematic historical concept art featuring a subtle silhouette of ${talent} as a modern storyteller, seamlessly blended with an epic backdrop of a ${setting} in ancient middle-eastern golden dunes at sunset. High contrast, dramatic backlighting, wind blowing sand, dust particles, epic masterwork illustration. Golden hour rim lighting, highly detailed historical aesthetic, narrative-driven mood, movie poster style.`;
    
    explanation = "Memadukan wajah modern sang mahasiswa KPI dengan latar belakang epik masa lalu yang dramatis, membangun nuansa petualangan dan kepahlawanan sirah nabawiyah secara estetik.";
    
    storyboard = [
      { sceneNum: 1, cameraAngle: "Low Angle Dramatic Wide Shot", talentMovement: "Talent berdiri membelakangi latar belakang transisi epik (misal visual gurun pasir/arsitektur kuno CGI), berbalik perlahan dengan tatapan mata tajam dan penuh semangat.", onScreenText: "KISAH PAHLAWAN YANG DILUPAKAN", audioVoiceover: "Di balik megahnya sejarah Islam, ada anak muda berumur 18 tahun yang dipercaya memimpin pasukan elit madinah. Siapa dia?", visualAmbiance: "Transisi warna dramatis dari gelap ke jingga membara." },
      { sceneNum: 2, cameraAngle: "Medium Shot (Gerak Kamera Dinamis/Dolly-in)", talentMovement: "Talent bercerita secara ekspresif dengan gerakan tangan teatrikal, menekankan poin-poin perjuangan heroik.", onScreenText: "Satu Pemuda Mengubah Sejarah", audioVoiceover: "Dia tidak takut kehilangan popularitas dunia, baginya membela risalah dakwah adalah kehormatan tertinggi!", visualAmbiance: "Cahaya dramatis dari samping (sidelight) menonjolkan siluet tegas talent." },
      { sceneNum: 3, cameraAngle: "Close-up Sinematik", talentMovement: "Talent menatap mantap ke kamera dengan ekspresi bangga dan tersenyum optimis.", onScreenText: "Giliran Kita Sekarang!", audioVoiceover: "Sejarah ditulis oleh para pemberani. Lalu, warisan apa yang akan kita buat hari ini?", visualAmbiance: "Efek partikel debu melayang estetik di layar." }
    ];
    takeaway = "Meneladari keberanian pemuda masa lalu untuk menjadi pelopor kebaikan di masa kini.";
  }
  else { // muamalah & isu sosial
    imagePrompt = `A dynamic, contemporary urban lifestyle photography of ${talent}. Located in a modern ${setting} with skyscraper reflections, busy street life in soft focus. Looking smart, checking a sleek smartphone or interacting naturally. Bright, clean metropolitan color grading, warm soft studio lights mixed with cold ambient city lights. Photorealistic, crisp commercial style, shot on Sony A7RIV.`;
    
    explanation = "Menggunakan setting urban kota modern untuk menghidupkan relevansi dakwah muamalah (seperti adab digital atau transaksi modern) langsung ke dalam realitas sehari-hari Gen Z.";
    
    storyboard = [
      { sceneNum: 1, cameraAngle: "Point of View (POV) / OTS", talentMovement: "Talent sedang menatap layar HP dengan dahi berkerut, lalu menurunkan HP-nya dan langsung curhat spontan ke arah kamera.", onScreenText: "PAYLATER JADI GAYA HIDUP?", audioVoiceover: "Guys, check out keranjang belanjaan sih seru ya. Tapi sadar gak sih, kebiasaan pakai paylater itu bisa menjebak?", visualAmbiance: `${setting} yang sibuk namun dikemas estetis.` },
      { sceneNum: 2, cameraAngle: "Medium Close-up", talentMovement: "Talent menjelaskan dengan infografis sederhana yang muncul di layar (CGI), memberikan perbandingan bijak.", onScreenText: "Gaya Hidup vs Jeratan Utang", audioVoiceover: "Islam itu mengajarkan kita hidup sesuai kemampuan, bukan kemauan. Hindari transaksi yang samar dan merugikan dirimu sendiri.", visualAmbiance: "Setting cafe modern yang terang dengan nuansa cozy." },
      { sceneNum: 3, cameraAngle: "Medium Shot (Whip Pan Transition)", talentMovement: "Talent melambaikan tangan dengan ceria, mengajak penonton mengambil keputusan finansial sehat.", onScreenText: "Yuk Lebih Bijak!", audioVoiceover: "Mulai hari ini, yuk kurangi foya-foya impulsif. Tabung uangmu untuk hal yang berkah. Follow untuk tips syariah harian!", visualAmbiance: "Visual bersih dengan warna modern." }
    ];
    takeaway = "Islam mengatur segala sendi kehidupan, termasuk adab bermedia sosial dan transaksi modern agar hidup berkah.";
  }

  return {
    textToImagePrompt: imagePrompt,
    textToImageExplanation: explanation,
    videoStoryboard: storyboard,
    keyTakeaway: takeaway
  };
};

export default function App() {
  const [activeStep, setActiveStep] = useState(1); // 1: Input, 2: Clarification, 3: Output
  
  // Form States
  const [talentDescription, setTalentDescription] = useState(TALENT_PRESETS[0].description);
  const [category, setCategory] = useState('akhlak');
  const [customTheme, setCustomTheme] = useState('');
  
  // Clarification States
  const [audienceApproach, setAudienceApproach] = useState('genz'); // genz, formal, emotional
  const [visualSetting, setVisualSetting] = useState('kafe'); // studio, kelas, alam, kafe
  const [colorTone, setColorTone] = useState('warm'); // warm, cool, cinematic

  // Output States
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);
  
  // Image Generation States
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [imageGenError, setImageGenError] = useState(null);

  // Video Preview Generation States
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generatedVideoFrameUrl, setGeneratedVideoFrameUrl] = useState(null);
  const [videoGenError, setVideoGenError] = useState(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  // Multi-Scene Navigation & TTS States
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSequence, setPlaybackSequence] = useState(false);

  // Safe manual copy fallback states
  const [showManualCopyModal, setShowManualCopyModal] = useState(false);
  const [manualCopyText, setManualCopyText] = useState('');

  // History / Saved prompts
  const [savedPrompts, setSavedPrompts] = useState([]);

  // TTS references
  const synthRef = useRef(null);
  const utteranceRef = useRef(null);

  // Automatically update topic placeholder based on category
  const selectedCat = CATEGORIES.find(c => c.id === category);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      stopVoiceover();
    };
  }, []);

  const stopVoiceover = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlayingVoice(false);
  };

  const playVoiceover = (text, onEndCallback = null) => {
    if (!synthRef.current) return;
    
    synthRef.current.cancel();

    if (isMuted) {
      setIsPlayingVoice(true);
      const timer = setTimeout(() => {
        setIsPlayingVoice(false);
        if (onEndCallback) onEndCallback();
      }, 3500);
      return;
    }

    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.lang = 'id-ID';
    utteranceRef.current.rate = 0.95; 

    utteranceRef.current.onstart = () => {
      setIsPlayingVoice(true);
    };

    utteranceRef.current.onend = () => {
      setIsPlayingVoice(false);
      if (onEndCallback) {
        onEndCallback();
      }
    };

    utteranceRef.current.onerror = () => {
      setIsPlayingVoice(false);
      if (onEndCallback) onEndCallback();
    };

    synthRef.current.speak(utteranceRef.current);
  };

  const startSequencePlayback = () => {
    if (!generatedData || !generatedData.videoStoryboard) return;
    
    stopVoiceover();
    setPlaybackSequence(true);
    
    const playScene = (idx) => {
      if (idx >= generatedData.videoStoryboard.length) {
        setPlaybackSequence(false);
        setCurrentSceneIdx(0);
        return;
      }
      
      setCurrentSceneIdx(idx);
      const scene = generatedData.videoStoryboard[idx];
      playVoiceover(scene.audioVoiceover, () => {
        setTimeout(() => {
          playScene(idx + 1);
        }, 1200); 
      });
    };

    playScene(0);
  };

  const togglePlayPauseVoice = () => {
    if (isPlayingVoice) {
      stopVoiceover();
      setPlaybackSequence(false);
    } else {
      if (playbackSequence) {
        startSequencePlayback();
      } else {
        const activeText = generatedData?.videoStoryboard?.[currentSceneIdx]?.audioVoiceover;
        if (activeText) {
          playVoiceover(activeText);
        }
      }
    }
  };

  const handleSelectPreset = (desc) => {
    setTalentDescription(desc);
  };

  const handleNextToClarify = () => {
    if (!customTheme.trim()) {
      setCustomTheme(selectedCat ? selectedCat.themePlaceholder.split(',')[0] : 'Tema Dakwah Kreatif');
    }
    setActiveStep(2);
  };

  const handleGeneratePrompts = async () => {
    setIsGenerating(true);
    setActiveStep(3);
    setGeneratedImageUrl(null); 
    setGeneratedVideoFrameUrl(null);
    setImageGenError(null);
    setVideoGenError(null);
    setIsPlayingPreview(false);
    setCurrentSceneIdx(0);
    setPlaybackSequence(false);
    stopVoiceover();

    const settingLabels = {
      studio: "studio podcast modern dengan pencahayaan neon estetik minimalis",
      kelas: "ruang kelas kampus penyiaran islam yang rapi dengan papan tulis berisikan mindmap",
      alam: "taman kota hijau terbuka yang sejuk dengan pepohonan rindang di sore hari",
      kafe: "sudut kafe modern yang estetik dengan pencahayaan warm, cangkir kopi, dan tumpukan buku"
    };

    const toneLabels = {
      warm: "warm/earth tone",
      cool: "cool/calm blue",
      cinematic: "sinematik dramatis"
    };

    const audienceLabels = {
      genz: "Gen-Z & Anak Muda kontemporer (gaya kasual, asyik, interaktif)",
      formal: "Akademisi & Formal (terstruktur, berbobot, berwibawa)",
      emotional: "Menyentuh Hati & Emosional (puitis, kontemplatif, syahdu)"
    };

    const inputs = {
      talent: talentDescription,
      category,
      theme: customTheme || (selectedCat ? selectedCat.themePlaceholder.split(',')[0] : 'Tema Dakwah'),
      audience: audienceLabels[audienceApproach],
      setting: settingLabels[visualSetting],
      tone: toneLabels[colorTone]
    };

    const systemPrompt = `Anda adalah AI pakar pembuat Prompt Gambar dan Storyboard Video Dakwah Islami Kreatif.
    Tugas Anda adalah menghasilkan prompt gambar Midjourney/Leonardo (dalam Bahasa Inggris) dan storyboard video pendek TikTok/Reel (dalam Bahasa Indonesia) yang disesuaikan dengan profil talent, kategori dakwah, tema, audiens, setting, dan warna.
    
    ATURAN ADAPTIF KATEGORI (PENTING):
    1. Jika Kategori adalah 'fiqh' (Ibadah): Fokus prompt gambar pada akurasi posisi tangan, sajadah, kerapian pakaian syar'i, shot medium hingga close-up yang presisi untuk memperlihatkan detail gerakan ibadah.
    2. Jika Kategori adalah 'akhlak' (Motivasi): Fokus pada ekspresi wajah yang teduh, damai, tenang, pencahayaan super lembut (soft lighting), suasana kontemplatif/menenangkan yang memicu kedamaian jiwa.
    3. Jika Kategori adalah 'sejarah' (Sirah): Gunakan gaya sinematik, dramatis, epik, transisi visual menakjubkan antara masa kini dan gambaran masa lalu padang pasir, siluet gagah berani.
    4. Jika Kategori adalah 'muamalah' (Isu Sosial): Tampilkan latar urban perkotaan modern, perkantoran, gadget, yang sangat relevan dengan aktivitas harian anak muda di era digital.

    Kembalikan respons harus dalam format JSON terstruktur yang valid sesuai schema berikut:
    {
      "textToImagePrompt": "Prompt bahasa inggris detail untuk AI Image Generator (Midjourney/Leonardo)",
      "textToImageExplanation": "Penjelasan singkat dalam Bahasa Indonesia kenapa elemen visual ini dipilih berdasarkan koridor syariat dan kategori dakwah",
      "videoStoryboard": [
        {
          "sceneNum": 1,
          "cameraAngle": "Angle kamera dan tipe shot",
          "talentMovement": "Deskripsi gerakan, gestur, dan ekspresi wajah talent",
          "onScreenText": "Teks singkat yang muncul di layar handphone penonton (CGI/Video Editor)",
          "audioVoiceover": "Skrip suara narasi/suara talent",
          "visualAmbiance": "Keterangan latar belakang dan efek pencahayaan"
        }
      ],
      "keyTakeaway": "Satu kalimat hikmah dakwah/moral pesan syariah dari konten ini"
    }`;

    const userQuery = `Buatlah aset prompt untuk:
    - Talent: ${inputs.talent}
    - Kategori: ${inputs.category} (${selectedCat?.title})
    - Tema Spesifik: ${inputs.theme}
    - Target Audiens: ${inputs.audience}
    - Lokasi/Setting: ${inputs.setting}
    - Tone Warna: ${inputs.tone}`;

    try {
      const apiKey = ""; 
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userQuery }] }],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                textToImagePrompt: { type: "STRING" },
                textToImageExplanation: { type: "STRING" },
                videoStoryboard: {
                  type: "ARRAY",
                  items: {
                    type: "OBJECT",
                    properties: {
                      sceneNum: { type: "NUMBER" },
                      cameraAngle: { type: "STRING" },
                      talentMovement: { type: "STRING" },
                      onScreenText: { type: "STRING" },
                      audioVoiceover: { type: "STRING" },
                      visualAmbiance: { type: "STRING" }
                    },
                    required: ["sceneNum", "cameraAngle", "talentMovement", "onScreenText", "audioVoiceover", "visualAmbiance"]
                  }
                },
                keyTakeaway: { type: "STRING" }
              },
              required: ["textToImagePrompt", "textToImageExplanation", "videoStoryboard", "keyTakeaway"]
            }
          },
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          }
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const result = await response.json();
      const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (rawText) {
        const parsed = JSON.parse(rawText);
        setGeneratedData({
          ...parsed,
          inputs 
        });
      } else {
        throw new Error('Empty response');
      }
    } catch (error) {
      console.warn("Menggunakan mesin fallback internal karena kendala API/koneksi:", error);
      const fallbackResult = getFallbackPrompt(inputs);
      setGeneratedData({
        ...fallbackResult,
        inputs
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateImagePreview = async () => {
    if (!generatedData || !generatedData.textToImagePrompt) return;
    
    setIsGeneratingImage(true);
    setImageGenError(null);
    setGeneratedImageUrl(null);

    const enhancedPrompt = `${generatedData.textToImagePrompt}. High aesthetic, clean background, beautiful cinematography, commercial grade photography. No text, no signature, elegant and respectful Islamic values.`;

    try {
      const apiKey = ""; 
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;

      const payload = {
        instances: { prompt: enhancedPrompt },
        parameters: {
          sampleCount: 1,
          aspectRatio: "1:1", 
          outputMimeType: "image/png"
        }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi server pembuatan gambar.');
      }

      const result = await response.json();
      if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
        const base64Data = result.predictions[0].bytesBase64Encoded;
        setGeneratedImageUrl(`data:image/png;base64,${base64Data}`);
      } else {
        throw new Error('Response gambar kosong.');
      }
    } catch (error) {
      console.error("Error generating image:", error);
      setImageGenError("Tidak dapat memuat visual preview otomatis saat ini. Anda dapat menyalin teks prompt di bawah dan menggunakannya langsung di Midjourney, Leonardo, atau Bing Image Creator secara mandiri.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const generateVideoPreview = async () => {
    if (!generatedData || !generatedData.videoStoryboard || generatedData.videoStoryboard.length === 0) return;
    
    setIsGeneratingVideo(true);
    setVideoGenError(null);
    setGeneratedVideoFrameUrl(null);

    const activeScene = generatedData.videoStoryboard[currentSceneIdx] || generatedData.videoStoryboard[0];
    const videoPrompt = `A dynamic cinematic 9:16 vertical video frame. ${activeScene.cameraAngle}. Featuring ${talentDescription}. Action/movement is: ${activeScene.talentMovement}. Set in: ${activeScene.visualAmbiance}. Beautiful composition, vibrant colors, warm inviting lighting, crisp focus, cinematic masterpiece portrait. No text overlay.`;

    try {
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;

      // Fixed: The system-guided schema payload for Imagen 4.0 expects a direct single object for 'instances' instead of an array.
      const payload = {
        instances: { prompt: videoPrompt },
        parameters: {
          sampleCount: 1,
          aspectRatio: "9:16", 
          outputMimeType: "image/png"
        }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Gagal menghasilkan visual video.');
      }

      const result = await response.json();
      if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
        const base64Data = result.predictions[0].bytesBase64Encoded;
        setGeneratedVideoFrameUrl(`data:image/png;base64,${base64Data}`);
        setIsPlayingPreview(true);
      } else {
        throw new Error('Response frame video kosong.');
      }
    } catch (error) {
      console.error("Error generating video frame:", error);
      setVideoGenError("Gagal merender adegan video secara langsung. Silakan gunakan panduan storyboard di bawah untuk memproduksi video Anda sendiri.");
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  const saveToHistory = () => {
    if (!generatedData) return;
    const isAlreadySaved = savedPrompts.some(item => item.theme === generatedData.inputs.theme);
    if (!isAlreadySaved) {
      setSavedPrompts([
        {
          id: Date.now(),
          theme: generatedData.inputs.theme,
          category: generatedData.inputs.category,
          data: generatedData,
          date: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        },
        ...savedPrompts
      ]);
    }
  };

  const loadFromHistory = (item) => {
    setGeneratedData(item.data);
    setTalentDescription(item.data.inputs.talent);
    setCategory(item.data.inputs.category);
    setCustomTheme(item.data.inputs.theme);
    setGeneratedImageUrl(null);
    setGeneratedVideoFrameUrl(null);
    setCurrentSceneIdx(0);
    setPlaybackSequence(false);
    stopVoiceover();
    setActiveStep(3);
  };

  const handleCopyText = (text, elementId) => {
    const success = safeCopyToClipboard(text);
    const targetElement = document.getElementById(elementId);
    
    if (success) {
      if (targetElement) {
        const oldText = targetElement.innerText;
        targetElement.innerText = 'Berhasil Tersalin! ✓';
        targetElement.classList.add('text-emerald-400');
        setTimeout(() => {
          targetElement.innerText = oldText;
          targetElement.classList.remove('text-emerald-400');
        }, 2000);
      }
    } else {
      setManualCopyText(text);
      setShowManualCopyModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-900">
      
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-emerald-600 to-amber-500 rounded-xl shadow-lg shadow-emerald-900/20">
              <Sparkles className="h-6 w-6 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                NurPrompt <span className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 font-normal">v2.1</span>
              </h1>
              <p className="text-xs text-slate-400">Prompt AI Generator Konten Dakwah Islam • KPI UNKAFA</p>
            </div>
          </div>
          
          {/* Progress Flow Indicators */}
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className={`px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all ${activeStep === 1 ? 'bg-emerald-500/20 text-emerald-400 font-medium border border-emerald-500/30' : 'bg-slate-800 text-slate-400'}`}>
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-white">1</span> Input Utama
            </span>
            <ChevronRight className="h-4 w-4 text-slate-600 hidden sm:inline" />
            <span className={`px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all ${activeStep === 2 ? 'bg-emerald-500/20 text-emerald-400 font-medium border border-emerald-500/30' : 'bg-slate-800 text-slate-400'}`}>
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-white">2</span> Klarifikasi Detail
            </span>
            <ChevronRight className="h-4 w-4 text-slate-600 hidden sm:inline" />
            <span className={`px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all ${activeStep === 3 ? 'bg-emerald-500/20 text-emerald-400 font-medium border border-emerald-500/30' : 'bg-slate-800 text-slate-400'}`}>
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-white">3</span> Hasil Prompt
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* STEP 1: Main configuration forms */}
        {activeStep === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Form Left Side */}
            <div className="lg:col-span-2 space-y-8 bg-slate-800/40 p-6 sm:p-8 rounded-2xl border border-slate-800">
              
              {/* Profile Talent Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-lg border-b border-slate-700/50 pb-2">
                  <User className="h-5 w-5" />
                  <h2>1. Profil & Karakter Talent (Ikon Dakwah)</h2>
                </div>
                <p className="text-sm text-slate-400">
                  Deskripsikan visual wajah, pakaian, almamater, atau gaya hijab mahasiswa KPI yang akan menjadi pembawa pesan dalam aset visual nanti.
                </p>

                {/* Preset Fast Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {TALENT_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectPreset(preset.description)}
                      className={`text-left p-3 rounded-xl border text-xs transition-all ${
                        talentDescription === preset.description 
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-900/10' 
                          : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <span className="font-semibold block mb-1 text-white">{preset.name}</span>
                      <span className="line-clamp-2 text-slate-400">{preset.description}</span>
                    </button>
                  ))}
                </div>

                <div className="relative mt-2">
                  <textarea
                    value={talentDescription}
                    onChange={(e) => setTalentDescription(e.target.value)}
                    rows={4}
                    placeholder="Contoh: Mahasiswa pria berumur 21 tahun, berwajah khas melayu ramah, mengenakan almamater hijau tua KPI, kemeja putih rapi, dan peci hitam polos..."
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl p-4 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-slate-600"
                  />
                  <span className="absolute bottom-3 right-3 text-xs text-slate-500">
                    {talentDescription.length} characters
                  </span>
                </div>
              </div>

              {/* Category & Theme Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-lg border-b border-slate-700/50 pb-2">
                  <BookOpen className="h-5 w-5" />
                  <h2>2. Kategori & Tema Dakwah Kreatif</h2>
                </div>
                <p className="text-sm text-slate-400">
                  Setiap kategori akan mengaktifkan aturan visual adaptif khusus yang memastikan keabsahan syariat dan kesesuaian suasana dakwah.
                </p>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {CATEGORIES.map((cat) => {
                    const CatIcon = cat.icon;
                    const isSelected = category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setCategory(cat.id);
                          setCustomTheme('');
                        }}
                        className={`text-left p-4 rounded-xl border-2 transition-all flex gap-3 ${
                          isSelected 
                            ? `${cat.color} border-current shadow-lg shadow-emerald-900/10` 
                            : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <div className="mt-1">
                          <CatIcon className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="font-bold flex items-center gap-2 text-sm">
                            <span className={isSelected ? 'text-slate-100' : 'text-slate-200'}>{cat.title}</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2">{cat.desc}</p>
                          <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full mt-2 font-medium ${
                            isSelected ? 'bg-emerald-500/20 text-emerald-200' : 'bg-slate-700 text-slate-400'
                          }`}>
                            {cat.badge}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Theme Input */}
                <div className="space-y-2 pt-3">
                  <label className="block text-sm font-medium text-slate-200">
                    Masukkan Tema / Judul Konten Dakwah Spesifik:
                  </label>
                  <input
                    type="text"
                    value={customTheme}
                    onChange={(e) => setCustomTheme(e.target.value)}
                    placeholder={`Rekomendasi tema: ${selectedCat ? selectedCat.themePlaceholder : ''}`}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-slate-600"
                  />
                  <p className="text-xs text-slate-500 italic">
                    💡 Tips: Masukkan topik hangat yang sedang viral di kalangan mahasiswa agar dakwah semakin relevan.
                  </p>
                </div>

              </div>

              {/* Action Button to Next Step */}
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={handleNextToClarify}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl font-semibold shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-2 text-sm active:scale-95"
                >
                  Lanjut ke Detail Klarifikasi
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

            </div>

            {/* Sidebar KPI Quick Tips */}
            <div className="space-y-6">
              
              <div className="bg-gradient-to-br from-emerald-950/40 to-slate-900 p-6 rounded-2xl border border-emerald-900/30 space-y-4">
                <div className="flex items-center gap-2 text-amber-500 font-semibold">
                  <Info className="h-5 w-5" />
                  <h3>Pedoman Etika Dakwah Visual</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Mahasiswa KPI (Komunikasi Penyiaran Islam) wajib menjunjung tinggi adab dan orisinalitas dalam bersosial media. AI hanyalah alat bantu (wasilah). Berikut batasan syariah visual:
                </p>
                <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
                  <li>Hindari menggambarkan nabi, rasul, dan sahabat utama dalam bentuk wajah eksplisit.</li>
                  <li>Pastikan pakaian talent menutup aurat secara sempurna dan sopan.</li>
                  <li>Visual tidak mengandung unsur menakut-nakuti berlebih atau khurafat.</li>
                  <li>Gunakan prompt ini sebagai referensi produksi video riil Anda.</li>
                </ul>
              </div>

              {/* Prompt History list */}
              {savedPrompts.length > 0 && (
                <div className="bg-slate-800/30 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="font-semibold text-slate-200 flex items-center gap-2">
                    <Compass className="h-4 w-4 text-emerald-400" />
                    Riwayat Prompt Tersimpan
                  </h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {savedPrompts.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => loadFromHistory(item)}
                        className="w-full text-left p-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 text-xs transition-all flex justify-between items-center"
                      >
                        <div className="truncate pr-2">
                          <span className="font-medium text-slate-200 block truncate">{item.theme}</span>
                          <span className="text-slate-500 capitalize text-[10px]">{item.category}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 shrink-0">{item.date}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

        {/* STEP 2: Clarification / Custom parameters */}
        {activeStep === 2 && (
          <div className="max-w-3xl mx-auto bg-slate-800/40 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-8">
            
            <div className="space-y-2 border-b border-slate-700/60 pb-4">
              <div className="flex items-center gap-2 text-amber-500 font-semibold text-lg">
                <Sliders className="h-5 w-5" />
                <h2>Pertanyaan Klarifikasi Konsep Konten</h2>
              </div>
              <p className="text-sm text-slate-400">
                NurPrompt memerlukan preferensi spesifik Anda untuk meracik angle sinematografi, tone warna, dan pendekatan narasi dakwah yang paling pas.
              </p>
            </div>

            {/* Question 1: Target Audience Approach */}
            <div className="space-y-3">
              <label className="block font-medium text-sm text-slate-200 flex items-center gap-2">
                <span className="w-5 h-5 flex items-center justify-center rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold">1</span>
                Target Audiens & Pendekatan Narasi:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setAudienceApproach('genz')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    audienceApproach === 'genz'
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300'
                      : 'bg-slate-900/60 border-slate-700 hover:bg-slate-900 text-slate-400'
                  }`}
                >
                  <span className="font-bold text-sm block text-white mb-1">Kasual / Gen-Z</span>
                  <span className="text-xs text-slate-400 leading-tight">Gaya santai, penuh istilah populer mahasiswa, interaktif, ramah.</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAudienceApproach('formal')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    audienceApproach === 'formal'
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300'
                      : 'bg-slate-900/60 border-slate-700 hover:bg-slate-900 text-slate-400'
                  }`}
                >
                  <span className="font-bold text-sm block text-white mb-1">Formal / Akademis</span>
                  <span className="text-xs text-slate-400 leading-tight">Terstruktur, berwibawa, penyebutan dalil hadits yang presisi dan mantap.</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAudienceApproach('emotional')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    audienceApproach === 'emotional'
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300'
                      : 'bg-slate-900/60 border-slate-700 hover:bg-slate-900 text-slate-400'
                  }`}
                >
                  <span className="font-bold text-sm block text-white mb-1">Emosional / Teduh</span>
                  <span className="text-xs text-slate-400 leading-tight">Menyentuh lubuk hati, puitis, berfokus pada ketenangan spiritual.</span>
                </button>
              </div>
            </div>

            {/* Question 2: Setting & Ambiance */}
            <div className="space-y-3">
              <label className="block font-medium text-sm text-slate-200 flex items-center gap-2">
                <span className="w-5 h-5 flex items-center justify-center rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold">2</span>
                Latar Tempat / Setting Visual (Ambiance):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'kafe', title: 'Kafe Estetis', desc: 'Sudut cozy hangat' },
                  { id: 'studio', title: 'Studio Modern', desc: 'Podcast minimalis' },
                  { id: 'kelas', title: 'Kelas Kampus', desc: 'Relatable kuliah' },
                  { id: 'alam', title: 'Alam Terbuka', desc: 'Taman sejuk asri' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setVisualSetting(item.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      visualSetting === item.id
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300'
                        : 'bg-slate-900/60 border-slate-700 hover:bg-slate-900 text-slate-400'
                    }`}
                  >
                    <span className="font-semibold text-xs text-white block">{item.title}</span>
                    <span className="text-[10px] text-slate-500 mt-1 block">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Tone Warna Visual */}
            <div className="space-y-3">
              <label className="block font-medium text-sm text-slate-200 flex items-center gap-2">
                <span className="w-5 h-5 flex items-center justify-center rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold">3</span>
                Tone Warna Visual (Color Science):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setColorTone('warm')}
                  className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    colorTone === 'warm'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                      : 'bg-slate-900/60 border-slate-700 hover:bg-slate-900 text-slate-400'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-amber-500 shrink-0" />
                  <div>
                    <span className="font-semibold text-xs text-white block">Warm / Earth Tone</span>
                    <span className="text-[10px] text-slate-500">Kekeluargaan, akrab, damai</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setColorTone('cool')}
                  className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    colorTone === 'cool'
                      ? 'bg-blue-500/10 border-blue-500 text-blue-300'
                      : 'bg-slate-900/60 border-slate-700 hover:bg-slate-900 text-slate-400'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-blue-400 shrink-0" />
                  <div>
                    <span className="font-semibold text-xs text-white block">Cool / Calm Blue</span>
                    <span className="text-[10px] text-slate-500">Segar, tenang, profesional</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setColorTone('cinematic')}
                  className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    colorTone === 'cinematic'
                      ? 'bg-purple-500/10 border-purple-500 text-purple-300'
                      : 'bg-slate-900/60 border-slate-700 hover:bg-slate-900 text-slate-400'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-purple-500 shrink-0" />
                  <div>
                    <span className="font-semibold text-xs text-white block">Cinematic Dramatic</span>
                    <span className="text-[10px] text-slate-500">Storytelling kuat, kontras tinggi</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-700/60">
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className="px-4 py-2 text-slate-400 hover:text-white transition-all text-sm font-medium"
              >
                Kembali ke Form Utama
              </button>
              
              <button
                type="button"
                onClick={handleGeneratePrompts}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-2 text-sm active:scale-95"
              >
                <Sparkles className="h-4 w-4 text-white" />
                Ramu & Hasilkan Prompt AI
              </button>
            </div>

          </div>
        )}

        {/* LOADING INDICATOR */}
        {isGenerating && (
          <div className="max-w-2xl mx-auto bg-slate-800/40 p-12 rounded-2xl border border-slate-800 text-center space-y-6 my-12">
            <div className="relative inline-block">
              <div className="w-16 h-16 rounded-full border-4 border-slate-700 border-t-emerald-500 animate-spin" />
              <Sparkles className="h-6 w-6 text-amber-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-white">Merumuskan Strategi Dakwah Visual...</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Model AI sedang menerjemahkan aturan syariat visual {category.toUpperCase()} dan memformulasikan script video pendek yang asyik bagi generasi muda.
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: Beautiful Dual Side-by-Side outputs */}
        {activeStep === 3 && !isGenerating && generatedData && (
          <div className="space-y-8">
            
            {/* Quick Summary Banner */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <span className="text-xs px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 font-medium capitalize">
                  Kategori: {CATEGORIES.find(c => c.id === generatedData.inputs.category)?.title}
                </span>
                <h2 className="text-xl font-bold text-white mt-2">
                  Tema: "{generatedData.inputs.theme}"
                </h2>
                <p className="text-xs text-slate-400">
                  Visual Ambiance: <span className="text-slate-300 font-medium">{generatedData.inputs.setting}</span> • Pendekatan: <span className="text-slate-300 font-medium">{audienceApproach.toUpperCase()}</span>
                </p>
              </div>

              {/* Actions row */}
              <div className="flex gap-2 w-full md:w-auto shrink-0">
                <button
                  onClick={() => {
                    saveToHistory();
                    const b = document.getElementById('toast-msg');
                    if (b) {
                      b.classList.remove('opacity-0');
                      setTimeout(() => b.classList.add('opacity-0'), 2500);
                    }
                  }}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Simpan Prompt
                </button>
                <button
                  onClick={() => setActiveStep(1)}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/20 flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <RefreshCw className="h-4 w-4" />
                  Buat Ulang / Tema Baru
                </button>
              </div>
            </div>

            {/* Toast feedback */}
            <div id="toast-msg" className="fixed bottom-5 right-5 bg-emerald-600 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl transition-all duration-300 opacity-0 pointer-events-none z-50 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Prompt dakwah berhasil disimpan ke riwayat Anda!
            </div>

            {/* SIDE-BY-SIDE OUTPUT CARD PANELS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* LEFT SIDE: Text-to-Image Prompt */}
              <div className="bg-slate-800/40 p-6 sm:p-8 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                        <ImageIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">Teks Prompt Text-to-Image</h3>
                        <p className="text-[10px] text-slate-500">Optimal untuk Midjourney, Leonardo AI, atau Bing</p>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20 uppercase">
                      Inggris AI-Ready
                    </span>
                  </div>

                  <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-700 relative group">
                    <p className="text-sm text-slate-300 leading-relaxed font-mono select-all">
                      {generatedData.textToImagePrompt}
                    </p>
                    <button
                      id="copy-image-btn"
                      onClick={() => handleCopyText(generatedData.textToImagePrompt, 'copy-image-btn')}
                      className="absolute bottom-2 right-2 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 hover:text-white border border-slate-700 rounded transition-all"
                    >
                      Salin Prompt
                    </button>
                  </div>

                  {/* Visual explanation mapping to syariah compliance */}
                  <div className="bg-emerald-950/10 p-4 rounded-xl border border-emerald-900/20 space-y-2">
                    <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <Info className="h-3.5 w-3.5" />
                      Kepatuhan Syariah & Estetika Visual:
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {generatedData.textToImageExplanation}
                    </p>
                  </div>
                </div>

                {/* IMAGEN IMAGE GENERATION PREVIEW SPACE */}
                <div className="border-t border-slate-700/50 pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Visual Preview Aset</h4>
                      <p className="text-[10px] text-slate-500">Uji coba langsung ke AI generator Imagen 4.0</p>
                    </div>
                    
                    {!generatedImageUrl && !isGeneratingImage && (
                      <button
                        onClick={generateImagePreview}
                        className="px-3.5 py-1.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white text-xs font-bold rounded-lg shadow transition-all active:scale-95 flex items-center gap-1"
                      >
                        <Sparkles className="h-3 w-3" />
                        Generate Visual
                      </button>
                    )}
                  </div>

                  {isGeneratingImage && (
                    <div className="h-64 bg-slate-900/60 rounded-xl border border-slate-700 flex flex-col items-center justify-center space-y-3 p-4">
                      <div className="w-10 h-10 border-4 border-slate-700 border-t-amber-500 rounded-full animate-spin" />
                      <div className="text-center">
                        <p className="text-xs text-slate-300 font-semibold">Menggambar dengan Imagen 4.0...</p>
                        <p className="text-[10px] text-slate-500 max-w-xs mt-1">Kami menerapkan filter adab guna memastikan visual tetap santun.</p>
                      </div>
                    </div>
                  )}

                  {imageGenError && (
                    <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex gap-3 text-xs text-amber-300">
                      <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{imageGenError}</p>
                    </div>
                  )}

                  {generatedImageUrl && (
                    <div className="space-y-3">
                      <div className="relative rounded-xl overflow-hidden border border-slate-700 group max-w-sm mx-auto shadow-2xl">
                        <img 
                          src={generatedImageUrl} 
                          alt="AI generated visual reference asset" 
                          className="w-full h-auto object-cover transition-all group-hover:scale-[1.02] duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all p-3 flex items-end justify-between">
                          <span className="text-[10px] text-slate-300 font-medium">Referensi Storyboard</span>
                          <a 
                            href={generatedImageUrl} 
                            download={`dakwah-visual-${Date.now()}.png`}
                            className="p-1.5 bg-emerald-600 text-white rounded hover:bg-emerald-500 transition-all"
                            title="Download Image"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 text-center italic">
                        Hasil visual di atas dapat Anda gunakan sebagai gambaran latar belakang, thumbnail, atau referensi penataan kamera saat shooting sesungguhnya.
                      </p>
                    </div>
                  )}

                </div>

              </div>

              {/* RIGHT SIDE: TikTok / Reels Storyboard Prompt */}
              <div className="bg-slate-800/40 p-6 sm:p-8 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                        <Video className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">Panduan Storyboard Video Pendek</h3>
                        <p className="text-[10px] text-slate-500">TikTok, Reels, & Shorts Video Scripting</p>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20 uppercase">
                      Siap Syuting / Record
                    </span>
                  </div>

                  {/* Interactive timeline for Storyboard */}
                  <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
                    {generatedData.videoStoryboard && generatedData.videoStoryboard.map((scene, idx) => (
                      <div key={idx} className="relative pl-6 border-l-2 border-slate-700/60 last:border-transparent pb-4">
                        {/* Timeline node */}
                        <button 
                          onClick={() => {
                            setCurrentSceneIdx(idx);
                            setPlaybackSequence(false);
                            stopVoiceover();
                          }}
                          className={`absolute -left-[9px] top-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                            currentSceneIdx === idx 
                              ? 'bg-emerald-500 text-slate-900 scale-110 shadow' 
                              : 'bg-slate-800 border-2 border-slate-700 text-slate-400 hover:border-emerald-400'
                          }`}
                        >
                          {scene.sceneNum}
                        </button>

                        {/* Scene details */}
                        <div 
                          onClick={() => {
                            setCurrentSceneIdx(idx);
                            setPlaybackSequence(false);
                            stopVoiceover();
                          }}
                          className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                            currentSceneIdx === idx 
                              ? 'bg-slate-800 border-emerald-500/65 shadow-lg' 
                              : 'bg-slate-900/60 border-slate-700/50 hover:bg-slate-850'
                          }`}
                        >
                          <div className="flex flex-wrap justify-between items-center gap-2">
                            <span className="text-xs font-bold text-slate-200 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                              🎬 Angle: {scene.cameraAngle}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              Latar: {scene.visualAmbiance}
                            </span>
                          </div>

                          <div className="text-xs text-slate-300 mt-1">
                            <p className="mb-1 text-slate-500 font-semibold uppercase text-[9px] tracking-wider">Aksi & Ekspresi Talent:</p>
                            <p className="italic bg-slate-950/20 p-2 rounded border border-slate-800/40">{scene.talentMovement}</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-800/80 mt-1">
                            <div className="text-xs">
                              <p className="text-slate-500 font-semibold uppercase text-[9px] tracking-wider mb-1">Overlay Teks Layar:</p>
                              <span className="px-2 py-1 bg-amber-500/10 text-amber-400 font-mono rounded inline-block text-[10px] border border-amber-500/15">
                                "{scene.onScreenText}"
                              </span>
                            </div>
                            <div className="text-xs">
                              <p className="text-slate-500 font-semibold uppercase text-[9px] tracking-wider mb-1 font-sans">Narasi Suara (VO):</p>
                              <p className="text-slate-300 font-medium leading-relaxed">
                                {scene.audioVoiceover}
                              </p>
                            </div>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Moral / Takeaway Message Card */}
                  <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-4 space-y-2">
                    <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Sari Pati Dakwah (Key Takeaway):</p>
                    <p className="text-sm text-slate-200 font-semibold italic">
                      "{generatedData.keyTakeaway}"
                    </p>
                  </div>

                </div>

                {/* ADVANCED MULTI-SCENE VIDEO PLAYER SECTION */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                          Simulasi Video Dakwah (Scene {currentSceneIdx + 1})
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        Visualisasi berurutan dengan Text-to-Speech narasi dakwah.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          const nextMute = !isMuted;
                          setIsMuted(nextMute);
                          if (nextMute) {
                            stopVoiceover();
                          }
                        }}
                        className={`p-1.5 rounded-lg border text-xs transition-all flex items-center gap-1 ${
                          isMuted 
                            ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                        }`}
                        title={isMuted ? "Unmute Voiceover" : "Mute Voiceover"}
                      >
                        {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                        <span className="text-[10px]">{isMuted ? "Muted" : "Suara Aktif"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Smart Video Simulation Device */}
                  <div className="relative w-full max-w-[260px] mx-auto rounded-[32px] overflow-hidden border-[6px] border-slate-800 shadow-2xl aspect-[9/16] bg-slate-900">
                    
                    {generatedVideoFrameUrl ? (
                      <img 
                        src={generatedVideoFrameUrl} 
                        alt={`Scene ${currentSceneIdx + 1} render`} 
                        className={`w-full h-full object-cover transition-all duration-[3000ms] ${
                          isPlayingVoice ? 'scale-105' : 'scale-100'
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-850 to-slate-950 p-6 text-center space-y-4">
                        <Video className="h-12 w-12 text-slate-700 animate-bounce" />
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-slate-400">Belum Ada Visualisasi Khusus</p>
                          <p className="text-[9px] text-slate-600">Klik tombol "Render Visual" di bawah untuk memproses mockup gambar Scene aktif ini.</p>
                        </div>
                      </div>
                    )}

                    {/* TikTok Layout Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 flex flex-col justify-between p-4 pointer-events-none">
                      
                      <div className="flex justify-between items-center w-full">
                        <span className="text-[9px] bg-emerald-600 text-white font-mono px-2 py-0.5 rounded-full">
                          ADEGAN {currentSceneIdx + 1}/{generatedData.videoStoryboard.length}
                        </span>
                        <span className="text-[9px] text-white/50 bg-black/40 px-1.5 py-0.5 rounded">
                          {generatedData.videoStoryboard[currentSceneIdx]?.cameraAngle.split(' ')[0]}
                        </span>
                      </div>

                      {isPlayingVoice && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-1.5 bg-black/40 p-2.5 rounded-full backdrop-blur-sm">
                          <span className="w-1.5 h-3 bg-emerald-500 rounded-full animate-pulse" />
                          <span className="w-1.5 h-4 bg-emerald-400 rounded-full animate-pulse [animation-delay:0.2s]" />
                          <span className="w-1.5 h-3 bg-emerald-500 rounded-full animate-pulse [animation-delay:0.4s]" />
                        </div>
                      )}

                      <div className="space-y-2 pt-12">
                        <div className="bg-amber-500 text-slate-950 font-extrabold px-2.5 py-1 text-[11px] rounded shadow-lg border border-amber-400 inline-block max-w-[90%] transform -rotate-1 select-none">
                          {generatedData.videoStoryboard[currentSceneIdx]?.onScreenText}
                        </div>

                        <div className="space-y-1 text-left">
                          <p className="text-[10px] font-bold text-white flex items-center gap-1">
                            <span>@kreator_kpi_dakwah</span>
                            <span className="text-[8px] bg-blue-500 text-white px-1 rounded-full">✓</span>
                          </p>
                          <p className="text-[9px] text-slate-300 line-clamp-3 leading-snug">
                            {generatedData.videoStoryboard[currentSceneIdx]?.audioVoiceover}
                          </p>
                          <p className="text-[8px] text-emerald-400 font-medium">🎵 Suara Asli - AI Dakwah KPI</p>
                        </div>

                        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-400 transition-all duration-300" 
                            style={{ width: `${((currentSceneIdx + 1) / generatedData.videoStoryboard.length) * 100}%` }}
                          />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Player controller buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-slate-900/80">
                    <button
                      onClick={() => {
                        stopVoiceover();
                        setPlaybackSequence(false);
                        setCurrentSceneIdx(prev => Math.max(0, prev - 1));
                      }}
                      disabled={currentSceneIdx === 0}
                      className="p-1.5 bg-slate-900 hover:bg-slate-850 rounded-lg text-slate-300 hover:text-white disabled:opacity-40 transition-all"
                      title="Adegan Sebelumnya"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    <button
                      onClick={togglePlayPauseVoice}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isPlayingVoice 
                          ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/20' 
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20'
                      }`}
                    >
                      {isPlayingVoice ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                      {isPlayingVoice ? "Pause Scene" : "Play Scene Voice"}
                    </button>

                    <button
                      onClick={() => {
                        if (playbackSequence) {
                          stopVoiceover();
                          setPlaybackSequence(false);
                        } else {
                          startSequencePlayback();
                        }
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                        playbackSequence 
                          ? 'bg-amber-600 border-amber-500 text-white' 
                          : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                      }`}
                    >
                      {playbackSequence ? "Stop Sequence" : "Play All Scenes"}
                    </button>

                    <button
                      onClick={() => {
                        stopVoiceover();
                        setPlaybackSequence(false);
                        setCurrentSceneIdx(prev => Math.min(generatedData.videoStoryboard.length - 1, prev + 1));
                      }}
                      disabled={currentSceneIdx === generatedData.videoStoryboard.length - 1}
                      className="p-1.5 bg-slate-900 hover:bg-slate-850 rounded-lg text-slate-300 hover:text-white disabled:opacity-40 transition-all"
                      title="Adegan Berikutnya"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Render Visual action trigger */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-2 items-center justify-between">
                    <p className="text-[10px] text-slate-500 text-center sm:text-left">
                      Ganti Scene di atas, lalu klik render visual adegan tersebut.
                    </p>
                    <button
                      onClick={generateVideoPreview}
                      disabled={isGeneratingVideo}
                      className="px-3 py-1.5 bg-gradient-to-r from-amber-600 to-emerald-600 text-white text-xs font-bold rounded-lg hover:from-amber-500 transition-all disabled:opacity-50 flex items-center gap-1 w-full sm:w-auto justify-center"
                    >
                      <Sparkles className="h-3 w-3" />
                      {isGeneratingVideo ? "Mempersiapkan..." : `Render Visual Scene ${currentSceneIdx + 1}`}
                    </button>
                  </div>

                  {videoGenError && (
                    <div className="p-2.5 bg-red-950/20 border border-red-900/30 rounded-lg text-[10px] text-red-300 text-center">
                      {videoGenError}
                    </div>
                  )}

                </div>

                <div className="border-t border-slate-700/50 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                  <span>Dihasilkan Khusus bagi Mahasiswa KPI</span>
                  <div className="flex gap-2 w-full sm:w-auto">

                    <button
                      id="copy-all-btn"
                      onClick={() => {
                        const scenesText = generatedData.videoStoryboard.map(s => `Adegan ${s.sceneNum} [${s.cameraAngle}]:\n- Visual: ${s.talentMovement}\n- Overlay Teks: "${s.onScreenText}"\n- Narasi Suara: "${s.audioVoiceover}"\n- Latar Belakang: ${s.visualAmbiance}`).join('\n\n');
                        const fullExport = `=== GENERATOR PROMPT DAKWAH KPI ===\nTema: ${generatedData.inputs.theme}\nKategori: ${generatedData.inputs.category.toUpperCase()}\n\n[1] IMAGE PROMPT (Midjourney):\n${generatedData.textToImagePrompt}\n\n[2] STORYBOARD VIDEO PENDEK:\n${scenesText}\n\n[3] KEY TAKEAWAY:\n"${generatedData.keyTakeaway}"\n\n=== ☕ Bagong De _ Gresiksatu.com ===`;
                        handleCopyText(fullExport, 'copy-all-btn');
                      }}
                      className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-slate-700 transition-all font-semibold w-full sm:w-auto text-center flex items-center justify-center gap-2"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Salin Semua Teks
                    </button>
                    
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </main>

      {/* Manual copy fallback trigger modal window */}
      {showManualCopyModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-slate-800 border border-slate-700 max-w-lg w-full rounded-2xl p-6 shadow-2xl space-y-4 text-left">
            <div className="flex items-center gap-2 text-amber-500">
              <AlertCircle className="h-5 w-5" />
              <h3 className="font-bold text-base text-white">Instruksi Salin Manual</h3>
            </div>
            <p className="text-xs text-slate-400">
              Kebijakan izin iframe memblokir operasi salin otomatis. Silakan salin semua teks yang telah terseleksi di bawah ini dengan menekan tombol <kbd className="bg-slate-700 px-1 rounded text-white font-mono">Ctrl + C</kbd> atau <kbd className="bg-slate-700 px-1 rounded text-white font-mono">Cmd + C</kbd>.
            </p>
            <textarea
              readOnly
              value={manualCopyText}
              onClick={(e) => {
                e.target.select();
              }}
              rows={8}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs font-mono text-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-transparent select-all"
            />
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowManualCopyModal(false);
                  setManualCopyText('');
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow transition-all"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer copyright with customized credits */}
      <footer className="border-t border-slate-800 mt-20 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>© 2026 KPI-Prompt AI UNKAFA. Dikembangkan khusus untuk membantu Mahasiswa KPI merancang pesan dakwah yang kreatif dan syar'i. ☕ Bagong De _ Gresiksatu.com</p>
          <div className="flex justify-center gap-4 text-slate-600">
            <span className="hover:text-emerald-500 transition-all cursor-pointer">Panduan KPI</span>
            <span>•</span>
            <span className="hover:text-emerald-500 transition-all cursor-pointer">Batasan Visual AI</span>
            <span>•</span>
            <span className="hover:text-emerald-500 transition-all cursor-pointer">Hubungi Lab Syariah</span>
          </div>
        </div>
      </footer>

    </div>
  );
}