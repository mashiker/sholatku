export interface MuhasabahQuestion {
    id: number;
    text: string;
    category: 'NIAT' | 'IBADAH' | 'AKHLAK' | 'DOSA' | 'HAWA_NAFSU';
    difficulty: 'LIGHT' | 'MODERATE' | 'DEEP';
    arabic?: string;
}

export const QUESTION_POOL: MuhasabahQuestion[] = [
    // --- NIAT & IBADAH (10) ---
    { id: 1, category: 'NIAT', difficulty: 'LIGHT', text: 'Apakah niat saya mengerjakan sesuatu hari ini semata-mata karena Allah?', arabic: 'هل كانت نيتي في كل عمل اليوم لله وحده؟' },
    { id: 2, category: 'IBADAH', difficulty: 'MODERATE', text: 'Dalam sholat hari ini, apakah hati saya hadir atau pikiran melayang?', arabic: 'هل صليت بخشوع وحضور قلب؟' },
    { id: 3, category: 'IBADAH', difficulty: 'LIGHT', text: 'Apakah saya sudah membaca Al-Quran hari ini?', arabic: 'كم قرأت من القرآن اليوم؟' },
    { id: 4, category: 'IBADAH', difficulty: 'MODERATE', text: 'Apakah dzikir saya hari ini hanya di lisan atau meresap ke hati?', arabic: 'هل كان ذكري باللسان فقط أم بالقلب أيضاً؟' },
    { id: 5, category: 'NIAT', difficulty: 'DEEP', text: 'Apakah saya beribadah karena ingin dilihat orang (Riya)?', arabic: 'هل خالط عملي شيء من الرياء؟' },
    { id: 6, category: 'IBADAH', difficulty: 'LIGHT', text: 'Apakah saya sholat tepat waktu hari ini?', arabic: 'هل صليت الصلاة في وقتها؟' },
    { id: 7, category: 'IBADAH', difficulty: 'MODERATE', text: 'Apakah saya menyempatkan sholat sunnah rawatib?', arabic: 'هل صليت السنن الرواتب؟' },
    { id: 8, category: 'IBADAH', difficulty: 'DEEP', text: 'Apakah saya merasa butuh kepada Allah saat berdoa?', arabic: 'هل شعرت بالافتخار إلى الله في الدعاء؟' },
    { id: 9, category: 'IBADAH', difficulty: 'LIGHT', text: 'Apakah saya bersedekah hari ini (harta/tenaga/senyum)?', arabic: 'هل تصدقت اليوم ولو ببسمة؟' },
    { id: 10, category: 'NIAT', difficulty: 'DEEP', text: 'Apakah saya ikhlas menerima takdir Allah hari ini?', arabic: 'هل رضيت بقضاء الله وقدره اليوم؟' },

    // --- AKHLAK & INTERAKSI (12) ---
    { id: 11, category: 'AKHLAK', difficulty: 'MODERATE', text: 'Apakah saya sabar menghadapi orang yang menyebalkan hari ini?', arabic: 'هل صبرت على أذى الناس؟' },
    { id: 12, category: 'AKHLAK', difficulty: 'LIGHT', text: 'Apakah saya tersenyum kepada saudara saya?', arabic: 'هل تبسمت في وجه أخيك؟' },
    { id: 13, category: 'AKHLAK', difficulty: 'DEEP', text: 'Apakah ada kesombongan di hati saya saat berbicara dengan orang lain?', arabic: 'هل كان في قلبي كبر عند الحديث؟' },
    { id: 14, category: 'AKHLAK', difficulty: 'MODERATE', text: 'Apakah saya menahan amarah saat dipancing emosi?', arabic: 'هل كظمت الغيظ؟' },
    { id: 15, category: 'AKHLAK', difficulty: 'LIGHT', text: 'Apakah saya berkata jujur sepanjang hari?', arabic: 'هل صدقت في كل أقوالي؟' },
    { id: 16, category: 'AKHLAK', difficulty: 'DEEP', text: 'Apakah saya memaafkan orang yang menyakiti saya?', arabic: 'هل عفوت عمن ظلمني؟' },
    { id: 17, category: 'AKHLAK', difficulty: 'MODERATE', text: 'Apakah saya membantu orang lain yang kesusahan?', arabic: 'هل أعنت ملهوفاً؟' },
    { id: 18, category: 'AKHLAK', difficulty: 'LIGHT', text: 'Apakah saya menghormati orang tua/guru hari ini?', arabic: 'هل بررت والديّ؟' },
    { id: 19, category: 'AKHLAK', difficulty: 'DEEP', text: 'Apakah saya diam dari membicarakan aib orang lain (Ghibah)?', arabic: 'هل حفظت لساني عن الغيبة؟' },
    { id: 20, category: 'AKHLAK', difficulty: 'MODERATE', text: 'Apakah saya menepati janji yang saya buat?', arabic: 'هل وفيت بالعهد؟' },
    { id: 21, category: 'AKHLAK', difficulty: 'LIGHT', text: 'Apakah uapan salam saya tulus mendoakan?', arabic: 'هل أفشيت السلام بقلب سليم؟' },
    { id: 22, category: 'AKHLAK', difficulty: 'DEEP', text: 'Apakah saya lebih sering mendengar daripada berbicara?', arabic: 'هل كنت مستمعاً أكثر مني متكلماً؟' },

    // --- HAWA NAFSU (12) ---
    { id: 23, category: 'HAWA_NAFSU', difficulty: 'MODERATE', text: 'Apakah saya makan berlebihan hari ini?', arabic: 'هل أسرفت في الطعام؟' },
    { id: 24, category: 'HAWA_NAFSU', difficulty: 'DEEP', text: 'Apakah saya menjaga pandangan dari yang haram?', arabic: 'هل غضضت بصري؟' },
    { id: 25, category: 'HAWA_NAFSU', difficulty: 'LIGHT', text: 'Berapa jam saya habiskan untuk social media?', arabic: 'كم ضيعت من الوقت في اللهو؟' },
    { id: 26, category: 'HAWA_NAFSU', difficulty: 'MODERATE', text: 'Apakah saya marah hanya karena ego saya terusik?', arabic: 'هل غضبت لنفسي؟' },
    { id: 27, category: 'HAWA_NAFSU', difficulty: 'DEEP', text: 'Apakah saya iri dengan rezeki orang lain?', arabic: 'هل حسدت أحداً على نعمة؟' },
    { id: 28, category: 'HAWA_NAFSU', difficulty: 'LIGHT', text: 'Apakah saya tidur terlalu banyak?', arabic: 'هل أكثرت من النوم؟' },
    { id: 29, category: 'HAWA_NAFSU', difficulty: 'MODERATE', text: 'Apakah saya belanja barang yang tidak perlu?', arabic: 'هل اشتريت ما لا أحتاج؟' },
    { id: 30, category: 'HAWA_NAFSU', difficulty: 'DEEP', text: 'Apakah saya takut miskin sehingga pelit?', arabic: 'هل بخلت خشية الفقر؟' },
    { id: 31, category: 'HAWA_NAFSU', difficulty: 'LIGHT', text: 'Apakah saya tertawa berlebihan sampai lupa akhirat?', arabic: 'هل ضحكت حتى مات قلبي؟' },
    { id: 32, category: 'HAWA_NAFSU', difficulty: 'MODERATE', text: 'Apakah saya menunda kebaikan karena malas?', arabic: 'هل سوفّت في الخير كسلاً؟' },
    { id: 33, category: 'HAWA_NAFSU', difficulty: 'DEEP', text: 'Apakah saya merasa diri saya suci?', arabic: 'هل زكيت نفسي؟' },
    { id: 34, category: 'HAWA_NAFSU', difficulty: 'MODERATE', text: 'Apakah saya berdebat hanya untuk menang?', arabic: 'هل جادلت لغلبة الخصم فقط؟' },

    // --- DOSA & KESALAHAN (10) ---
    { id: 35, category: 'DOSA', difficulty: 'DEEP', text: 'Dosa apa yang saya lakukan hari ini dan belum saya taubati?', arabic: 'أي ذنب أذنبت ولم أتب منه؟' },
    { id: 36, category: 'DOSA', difficulty: 'MODERATE', text: 'Apakah saya meremehkan dosa kecil?', arabic: 'هل استصغرت الصغائر؟' },
    { id: 37, category: 'DOSA', difficulty: 'LIGHT', text: 'Apakah saya lupa bersyukur atas nikmat hari ini?', arabic: 'هل غفلت عن شكر النعمة؟' },
    { id: 38, category: 'DOSA', difficulty: 'DEEP', text: 'Apakah saya menangis karena takut kepada Allah?', arabic: 'هل بكيت من خشية الله؟' },
    { id: 39, category: 'DOSA', difficulty: 'MODERATE', text: 'Apakah saya menyia-nyiakan waktu luang?', arabic: 'هل أضعت وقت الفراغ؟' },
    { id: 40, category: 'DOSA', difficulty: 'LIGHT', text: 'Apakah saya mengeluh atas musibah kecil?', arabic: 'هل تسخطت على البلاء؟' },
    { id: 41, category: 'DOSA', difficulty: 'DEEP', text: 'Apakah sholat saya mencegah saya dari maksiat?', arabic: 'هل نهتني صلاتي عن المنكر؟' },
    { id: 42, category: 'DOSA', difficulty: 'MODERATE', text: 'Apakah saya berburuk sangka kepada Allah?', arabic: 'هل ساء ظني بالله؟' },
    { id: 43, category: 'DOSA', difficulty: 'LIGHT', text: 'Apakah saya lalai mengingat mati?', arabic: 'هل غفلت عن ذكر الموت؟' },
    { id: 44, category: 'DOSA', difficulty: 'DEEP', text: 'Apakah saya siap jika dipanggil Allah malam ini?', arabic: 'هل أنا مستعد للقاء الله الليلة؟' },
];

// Simple seeded random function to ensure same questions for the day
export const getDailyQuestions = (dateStr: string): MuhasabahQuestion[] => {
    // Determine seed from date string YYYY-MM-DD
    let seed = 0;
    for (let i = 0; i < dateStr.length; i++) {
        seed = ((seed << 5) - seed) + dateStr.charCodeAt(i);
        seed |= 0;
    }

    const random = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };

    // We want 4 questions total
    // Try to get 1 from each category if possible, or mix difficulties
    const shuffled = [...QUESTION_POOL].sort(() => 0.5 - random());

    // Pick 4
    return shuffled.slice(0, 4);
};
