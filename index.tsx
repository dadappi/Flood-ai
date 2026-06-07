import React, { useMemo, useState } from 'react';
import { CheckCircle2, RotateCcw, BookOpen, Brain, Target, BadgeCheck } from 'lucide-react';

const lessons = [
  {
    title: 'Futsal',
    summary:
      'Futsal menekankan kontrol bola cepat, passing pendek, dribbling rapat, dan pengambilan keputusan dalam ruang sempit. Teknik dasar yang sering muncul adalah kontrol, passing, dribble, dan shooting.',
    points: [
      'Kontrol bola bisa memakai telapak kaki, sol dalam, atau paha sesuai arah bola.',
      'Passing jarak dekat umumnya menggunakan kaki bagian dalam agar akurat.',
      'Dribble yang baik menjaga bola dekat dengan kaki agar mudah dikendalikan.',
      'Kesalahan umum: bola terlalu jauh saat dribble, badan tidak seimbang, dan kontrol buruk.',
    ],
  },
  {
    title: 'Bola Voli',
    summary:
      'Bola voli menuntut koordinasi tangan, posisi tubuh siap, dan timing yang tepat. Servis bawah, passing bawah, dan smash adalah teknik inti yang harus dipahami.',
    points: [
      'Servis bawah dilakukan dari bawah pinggang dengan ayunan lengan ke depan.',
      'Passing bawah dipakai untuk menerima bola servis atau bola serangan ringan.',
      'Sikap passing bawah: lutut ditekuk, badan condong, kedua lengan dirapatkan.',
      'Smash adalah pukulan keras dan menukik untuk mematikan lawan.',
    ],
  },
  {
    title: 'Bola Basket',
    summary:
      'Basket menuntut penguasaan dribble, passing, dan shooting. Konsep penting yang sering ditanya antara lain chest pass, bounce pass, teknik shooting, prinsip BEEF, dan kesalahan dasar saat bermain.',
    points: [
      'Chest pass dilempar dari depan dada ke dada teman dengan dua tangan.',
      'Bounce pass dipantulkan ke lantai agar mudah diterima dalam situasi tertentu.',
      'BEEF pada shooting: Balance, Eyes, Elbow, Follow through.',
      'Double dribble terjadi bila pemain menggiring, berhenti, lalu menggiring lagi.',
    ],
  },
  {
    title: 'Senam Irama',
    summary:
      'Senam irama mengutamakan gerak yang serasi dengan musik, keluwesan, ketepatan hitungan, dan kontinuitas gerak. Pemanasan sangat penting sebelum melakukan rangkaian gerak.',
    points: [
      'Fase umum senam irama: pemanasan, inti, dan pendinginan.',
      'Keserasian gerak dan musik membuat gerakan tampak indah dan teratur.',
      'Latihan hitungan membantu gerakan lebih ritmis dan tepat tempo.',
      'Manfaatnya antara lain kebugaran, koordinasi, dan kelenturan.',
    ],
  },
  {
    title: 'Kebugaran Jasmani',
    summary:
      'Kebugaran jasmani berkaitan dengan kemampuan tubuh melakukan aktivitas tanpa cepat lelah. Pemanasan dilakukan sebelum olahraga dan pendinginan dilakukan setelah olahraga.',
    points: [
      'Sebelum olahraga: pemanasan untuk menyiapkan otot dan sendi.',
      'Setelah olahraga: pendinginan untuk menurunkan denyut nadi bertahap.',
      'Kelincahan penting pada olahraga seperti bulu tangkis, sepak bola, dan basket.',
    ],
  },
  {
    title: 'Gaya Hidup Sehat',
    summary:
      'Gaya hidup sehat mencakup pola makan seimbang, kebersihan diri dan lingkungan, tidur cukup, aktivitas fisik, serta menghindari kebiasaan yang merugikan kesehatan.',
    points: [
      'Pola makan sehat bertujuan menjaga pertumbuhan, energi, dan daya tahan tubuh.',
      'Kesehatan sangat dipengaruhi oleh lingkungan yang bersih dan perilaku hidup bersih.',
      'Perilaku sehat meliputi makan bergizi, olahraga, istirahat cukup, dan tidak merokok.',
    ],
  },
];

const questions = [
  { topic: 'Futsal', q: 'Dalam permainan futsal, teknik dasar yang paling tepat untuk menghentikan bola adalah ...', options: ['Kontrol bola', 'Smash', 'Servis bawah', 'Blocking'], answer: 0, explanation: 'Menghentikan bola termasuk teknik dasar kontrol bola dalam futsal.' },
  { topic: 'Futsal', q: 'Saat bola datang dari arah depan pada futsal, sikap kaki yang tepat ketika melakukan kontrol adalah ...', options: ['Kaku dan lurus', 'Sedikit rileks untuk menahan bola', 'Ditinggikan setinggi mungkin', 'Disilangkan ke belakang'], answer: 1, explanation: 'Kaki yang rileks membantu bola berhenti dengan baik dan tidak memantul jauh.' },
  { topic: 'Futsal', q: 'Untuk mengoper bola jarak dekat pada futsal, bagian kaki yang paling tepat digunakan adalah ...', options: ['Punggung kaki', 'Kaki bagian dalam', 'Ujung jari kaki', 'Tumit'], answer: 1, explanation: 'Kaki bagian dalam menghasilkan passing yang lebih akurat untuk jarak dekat.' },
  { topic: 'Futsal', q: 'Seorang pemain melakukan dribble, tetapi bola selalu terlalu jauh dari jangkauan kaki. Kesalahan yang paling mungkin terjadi adalah ...', options: ['Sentuhan bola terlalu kuat', 'Bola dikontrol rapat', 'Badan terlalu seimbang', 'Pandangan ke depan'], answer: 0, explanation: 'Sentuhan yang terlalu kuat membuat bola sulit dijaga dekat saat dribble.' },
  { topic: 'Futsal', q: 'Penggunaan telapak kaki saat mengontrol bola dalam futsal bertujuan untuk ...', options: ['Membuat bola melambung tinggi', 'Menghentikan bola dengan stabil', 'Menendang bola keras', 'Memutar badan'], answer: 1, explanation: 'Telapak kaki efektif untuk menghentikan bola agar tetap dekat.' },
  { topic: 'Futsal', q: 'Menjaga bola tetap dekat saat dribble berguna agar pemain dapat ...', options: ['Mudah kehilangan bola', 'Lebih mudah mengubah arah dan melindungi bola', 'Membuat bola keluar lapangan', 'Tidak perlu melihat bola'], answer: 1, explanation: 'Bola yang dekat memudahkan kontrol, perlindungan, dan perubahan arah.' },
  { topic: 'Bola Voli', q: 'Gerakan untuk memulai permainan bola voli dengan ayunan dari bawah disebut ...', options: ['Servis bawah', 'Passing atas', 'Smash', 'Blocking'], answer: 0, explanation: 'Servis bawah adalah teknik dasar untuk memulai rally dari bawah.' },
  { topic: 'Bola Voli', q: 'Urutan yang benar saat melakukan passing bawah adalah ...', options: ['Berdiri tegak lalu memukul bola', 'Bersiap, tekuk lutut, rapatkan lengan, lalu dorong bola', 'Lompat lalu memukul bola', 'Berlari lalu menendang bola'], answer: 1, explanation: 'Passing bawah dimulai dari posisi siap dengan lutut ditekuk dan lengan dirapatkan.' },
  { topic: 'Bola Voli', q: 'Pukulan smash pada bola voli bertujuan untuk ...', options: ['Menghentikan bola', 'Mematikan pertahanan lawan dengan pukulan keras', 'Memulai servis', 'Menahan bola di udara'], answer: 1, explanation: 'Smash adalah pukulan serangan keras yang diarahkan menukik.' },
  { topic: 'Bola Voli', q: 'Passing bawah paling sering digunakan ketika bola ...', options: ['Datang rendah atau dari servis lawan', 'Berada di belakang net', 'Akan dismash teman', 'Sudah keluar lapangan'], answer: 0, explanation: 'Passing bawah cocok untuk menerima bola rendah, terutama servis lawan.' },
  { topic: 'Bola Voli', q: 'Sikap yang benar saat melakukan passing bawah adalah ...', options: ['Lutut ditekuk, badan condong, dan lengan dirapatkan', 'Badan tegak kaku, tangan di belakang', 'Lutut lurus, tangan terbuka lebar', 'Berlutut sambil menoleh ke belakang'], answer: 0, explanation: 'Sikap siap dengan lutut ditekuk membuat kontrol bola lebih baik.' },
  { topic: 'Bola Voli', q: 'Kesalahan yang paling sering membuat passing bawah tidak tepat sasaran adalah ...', options: ['Lengan terlalu kaku atau tidak membentuk bidang pantul yang baik', 'Pandangan ke bola', 'Lutut ditekuk', 'Badan condong ke depan'], answer: 0, explanation: 'Lengan yang kaku atau posisi bidang pantul salah membuat arah bola tidak terkontrol.' },
  { topic: 'Bola Basket', q: 'Teknik mengoper bola basket dengan cara memantulkan bola ke lantai disebut ...', options: ['Chest pass', 'Bounce pass', 'Overhead pass', 'Dribble'], answer: 1, explanation: 'Bounce pass adalah operan yang dipantulkan ke lantai sebelum diterima.' },
  { topic: 'Bola Basket', q: 'Operan yang dilakukan dari depan dada menggunakan dua tangan adalah ...', options: ['Chest pass', 'Bounce pass', 'Baseball pass', 'Hook pass'], answer: 0, explanation: 'Chest pass dilakukan dari dada ke dada dengan dorongan dua tangan.' },
  { topic: 'Bola Basket', q: 'Prinsip utama shooting pada bola basket adalah ...', options: ['Arah bola harus tepat menuju ring', 'Bola dilempar ke lantai', 'Pemain harus berlari terus', 'Tangan harus selalu di bawah bola'], answer: 0, explanation: 'Shooting menuntut arah dan kontrol bola menuju ring.' },
  { topic: 'Bola Basket', q: 'Pada teknik shooting, posisi elbow yang benar sebaiknya ...', options: ['Mengarahkan bola ke ring', 'Membelakangi target', 'Menempel ke pinggang', 'Tidak aktif digunakan'], answer: 0, explanation: 'Elbow yang mengarah ke ring membantu lintasan bola lebih lurus.' },
  { topic: 'Bola Basket', q: 'Istilah BEEF dalam shooting merupakan singkatan dari ...', options: ['Balance, Eyes, Elbow, Follow through', 'Bounce, Energy, Eye, Force', 'Body, Elbow, Feet, Throw', 'Basic, End, Force, Target'], answer: 0, explanation: 'BEEF adalah konsep teknik shooting yang paling umum diajarkan.' },
  { topic: 'Bola Basket', q: 'Balance dalam shooting berarti ...', options: ['Tubuh seimbang saat melepaskan bola', 'Berlari secepat mungkin', 'Bola harus dipantulkan dulu', 'Tangan harus tertutup'], answer: 0, explanation: 'Keseimbangan tubuh penting agar tembakan stabil dan akurat.' },
  { topic: 'Bola Basket', q: 'Salah satu kesalahan shooting yang sering terjadi adalah ...', options: ['Elbow tidak mengarah ke ring', 'Fokus pada target', 'Kaki seimbang', 'Follow through baik'], answer: 0, explanation: 'Arah elbow yang salah membuat hasil shooting tidak konsisten.' },
  { topic: 'Bola Basket', q: 'Kesalahan dribble yang paling jelas adalah ...', options: ['Bola dipantulkan terlalu tinggi sehingga mudah direbut', 'Bola dekat dengan tubuh', 'Pandangan ke depan', 'Kaki ditekuk'], answer: 0, explanation: 'Dribble yang terlalu tinggi membuat kontrol bola lemah.' },
  { topic: 'Bola Basket', q: 'Double dribble adalah pelanggaran ketika pemain ...', options: ['Mengoper lalu menangkap bola', 'Menggiring bola, berhenti, lalu menggiring lagi', 'Menembak ke ring', 'Menerima operan dengan dua tangan'], answer: 1, explanation: 'Setelah berhenti dribble, pemain tidak boleh menggiring lagi sebelum passing atau shooting.' },
  { topic: 'Bola Basket', q: 'Teknik shooting yang benar harus memperhatikan ...', options: ['Keseimbangan, arah pandangan, dan follow through', 'Kecepatan lari, suara, dan tinggi badan', 'Jumlah operan, langkah, dan tumpuan', 'Waktu istirahat, napas, dan peluit'], answer: 0, explanation: 'Tiga unsur tersebut menentukan akurasi tembakan.' },
  { topic: 'Bola Basket', q: 'Dribble dalam bola basket adalah ...', options: ['Memantulkan bola ke lantai secara berulang', 'Menendang bola ke depan', 'Melempar bola ke atas', 'Menahan bola dengan kaki'], answer: 0, explanation: 'Dribble berarti memantulkan bola berulang sambil bergerak atau diam.' },
  { topic: 'Bola Basket', q: 'Urutan chest pass yang benar adalah ...', options: ['Bola di dada, dorong dengan dua tangan ke target', 'Bola di kaki, lalu diputar', 'Bola di belakang kepala, lalu dijatuhkan', 'Bola di lantai, lalu dilempar'], answer: 0, explanation: 'Chest pass dimulai dari depan dada dan didorong lurus ke sasaran.' },
  { topic: 'Bola Basket', q: 'Posisi yang baik saat menerima passing adalah ...', options: ['Tubuh siap, tangan terbuka, dan fokus ke bola', 'Membelakangi bola', 'Berdiri kaku tanpa gerak', 'Mata tertutup agar tidak silau'], answer: 0, explanation: 'Posisi siap memudahkan bola diterima dengan aman.' },
  { topic: 'Senam Irama', q: 'Fase umum dalam senam irama biasanya terdiri atas ...', options: ['Pemanasan, inti, dan pendinginan', 'Lari, lompat, dan tendang', 'Servis, passing, dan smash', 'Dribble, shooting, dan rebound'], answer: 0, explanation: 'Senam irama memiliki tiga bagian utama: pemanasan, inti, dan pendinginan.' },
  { topic: 'Senam Irama', q: 'Fungsi keserasian gerak dengan musik adalah ...', options: ['Membuat gerakan lebih indah, teratur, dan sesuai irama', 'Membuat tubuh cepat lelah', 'Mengurangi koordinasi', 'Menghilangkan tempo'], answer: 0, explanation: 'Musik membantu gerak tampak serasi dan ritmis.' },
  { topic: 'Senam Irama', q: 'Unsur harmonisasi gerak pada senam irama berkaitan dengan ...', options: ['Keselarasan gerak, irama, dan keluwesan', 'Kekuatan lemparan bola', 'Kecepatan sprint', 'Jumlah pemain'], answer: 0, explanation: 'Harmonisasi menekankan kesesuaian gerak dengan irama.' },
  { topic: 'Senam Irama', q: 'Tujuan pemanasan sebelum senam irama adalah ...', options: ['Mempersiapkan otot dan mencegah cedera', 'Membuat tubuh lemas', 'Mengurangi kelenturan', 'Menghentikan denyut nadi'], answer: 0, explanation: 'Pemanasan meningkatkan kesiapan tubuh sebelum bergerak aktif.' },
  { topic: 'Senam Irama', q: 'Latihan hitungan diperlukan agar gerakan ...', options: ['Sesuai tempo dan lebih teratur', 'Menjadi acak', 'Tidak perlu musik', 'Lebih lambat dari normal'], answer: 0, explanation: 'Hitungan membantu ketepatan ritme dan urutan gerak.' },
  { topic: 'Senam Irama', q: 'Salah satu manfaat senam irama adalah ...', options: ['Melatih koordinasi dan kelenturan tubuh', 'Membuat tubuh pasif', 'Menurunkan kebugaran', 'Mengurangi keseimbangan'], answer: 0, explanation: 'Senam irama bermanfaat bagi koordinasi, kelenturan, dan kebugaran.' },
  { topic: 'Bola Basket', q: 'Teknik menerima passing yang benar adalah ...', options: ['Menyiapkan tangan dan tubuh agar bola mudah ditangkap', 'Membiarkan bola mengenai wajah', 'Berdiri membeku tanpa gerak', 'Membelakangi bola'], answer: 0, explanation: 'Menerima passing memerlukan posisi siap dengan tangan terbuka.' },
  { topic: 'Kebugaran Jasmani', q: 'Kegiatan yang tepat dilakukan setelah olahraga adalah ...', options: ['Pendinginan', 'Langsung duduk diam total', 'Makan sangat banyak', 'Lari sprint lagi'], answer: 0, explanation: 'Pendinginan membantu menurunkan intensitas aktivitas secara bertahap.' },
  { topic: 'Kebugaran Jasmani', q: 'Kegiatan yang tepat dilakukan sebelum olahraga adalah ...', options: ['Pemanasan', 'Tidur', 'Makan cepat saji', 'Berdiam diri lama'], answer: 0, explanation: 'Pemanasan mempersiapkan otot dan sendi agar tidak mudah cedera.' },
  { topic: 'Kebugaran Jasmani', q: 'Olahraga yang sangat memerlukan kelincahan adalah ...', options: ['Bulu tangkis', 'Membaca buku', 'Menonton film', 'Mendengarkan musik'], answer: 0, explanation: 'Bulu tangkis menuntut perubahan arah dan reaksi cepat.' },
  { topic: 'Gaya Hidup Sehat', q: 'Tujuan pola makan sehat adalah ...', options: ['Menjaga pertumbuhan dan kesehatan tubuh', 'Membuat tubuh kekurangan energi', 'Mengurangi kebutuhan gizi', 'Membuat tubuh mudah sakit'], answer: 0, explanation: 'Pola makan sehat mendukung pertumbuhan, energi, dan daya tahan tubuh.' },
  { topic: 'Gaya Hidup Sehat', q: 'Yang termasuk faktor gaya hidup sehat adalah ...', options: ['Olahraga, istirahat cukup, dan makan bergizi', 'Begadang, merokok, dan malas bergerak', 'Makan sembarang dan jarang minum air', 'Tidak menjaga kebersihan'], answer: 0, explanation: 'Gaya hidup sehat dibangun oleh kebiasaan yang mendukung kesehatan.' },
  { topic: 'Gaya Hidup Sehat', q: 'Hubungan kesehatan dan lingkungan yang tepat adalah ...', options: ['Lingkungan bersih mendukung kesehatan', 'Lingkungan kotor tidak berpengaruh', 'Kesehatan tidak bergantung pada kebersihan', 'Air bersih tidak diperlukan'], answer: 0, explanation: 'Lingkungan bersih menurunkan risiko penyakit dan mendukung hidup sehat.' },
  { topic: 'Gaya Hidup Sehat', q: 'Contoh pola makan sehat adalah ...', options: ['Makan sayur, buah, protein, dan minum air cukup', 'Hanya minum minuman manis', 'Tidak sarapan setiap hari', 'Makan gorengan terus-menerus'], answer: 0, explanation: 'Pola makan sehat harus seimbang dan cukup cairan.' },
  { topic: 'Gaya Hidup Sehat', q: 'Perilaku yang mencerminkan gaya hidup sehat adalah ...', options: ['Tidur cukup, aktif bergerak, dan menjaga kebersihan', 'Begadang setiap malam', 'Jarang mandi', 'Makan tidak teratur'], answer: 0, explanation: 'Tidur cukup, aktivitas fisik, dan kebersihan adalah inti hidup sehat.' },
];

function shuffleOptions(items) {
  return items.map((item, index) => ({ ...item, id: index + 1 }));
}

export default function App() {
  const [tab, setTab] = useState('latihan');
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [filter, setFilter] = useState('Semua');

  const score = useMemo(() => {
    return questions.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0);
  }, [answers]);

  const filteredQuestions = useMemo(() => {
    if (filter === 'Semua') return questions;
    return questions.filter((q) => q.topic === filter);
  }, [filter]);

  const topics = ['Semua', ...new Set(questions.map((q) => q.topic))];

  const reset = () => {
    setAnswers(Array(questions.length).fill(null));
    setSubmitted(false);
    setFilter('Semua');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl p-4 md:p-8">
        <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                <Target size={16} />
                PJOK PAS / Kisi-kisi 40 Butir
              </div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Pembahasan + Web Latihan Interaktif</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Materi disusun mengikuti kisi-kisi yang memuat futsal, bola voli, bola basket, senam irama, kebugaran jasmani, dan gaya hidup sehat.
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setTab('pembahasan')} className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${tab === 'pembahasan' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-800'}`}>
                Pembahasan
              </button>
              <button onClick={() => setTab('latihan')} className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${tab === 'latihan' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-800'}`}>
                Latihan Soal
              </button>
            </div>
          </div>
        </div>

        {tab === 'pembahasan' && (
          <div className="grid gap-5 lg:grid-cols-2">
            {lessons.map((lesson) => (
              <div key={lesson.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="mb-3 flex items-center gap-2 text-lg font-semibold">
                  <BookOpen size={18} />
                  {lesson.title}
                </div>
                <p className="mb-4 text-sm leading-6 text-slate-700">{lesson.summary}</p>
                <ul className="space-y-2 text-sm leading-6 text-slate-700">
                  {lesson.points.map((p) => (
                    <li key={p} className="rounded-2xl bg-slate-50 px-3 py-2">• {p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {tab === 'latihan' && (
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="h-fit rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 lg:sticky lg:top-6">
              <div className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Brain size={18} />
                Navigasi
              </div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Filter materi</label>
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="mb-4 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400">
                {topics.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <div className="mb-4 rounded-2xl bg-slate-50 p-4">
                <div className="text-sm text-slate-600">Skor</div>
                <div className="mt-1 text-3xl font-bold">{submitted ? score : '—'} / {questions.length}</div>
                <div className="mt-1 text-xs text-slate-500">{submitted ? 'Setelah dikoreksi otomatis' : 'Kerjakan soal lalu tekan nilai'}</div>
              </div>

              <button onClick={() => setSubmitted(true)} className="mb-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
                <BadgeCheck size={16} />
                Nilai Jawaban
              </button>
              <button onClick={reset} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-800">
                <RotateCcw size={16} />
                Reset
              </button>
            </aside>

            <main className="space-y-4">
              {filteredQuestions.map((q, index) => {
                const realIndex = questions.indexOf(q);
                const picked = answers[realIndex];
                const isCorrect = submitted && picked === q.answer;
                const isWrong = submitted && picked !== null && picked !== q.answer;

                return (
                  <div key={realIndex} className={`rounded-3xl bg-white p-6 shadow-sm ring-1 ${isCorrect ? 'ring-emerald-300' : isWrong ? 'ring-rose-300' : 'ring-slate-200'}`}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{q.topic}</span>
                      <span className="text-xs text-slate-500">Soal {realIndex + 1}</span>
                    </div>
                    <h3 className="text-base font-semibold leading-6">{q.q}</h3>
                    <div className="mt-4 grid gap-3">
                      {q.options.map((opt, optIndex) => {
                        const selected = picked === optIndex;
                        const correct = submitted && optIndex === q.answer;
                        const wrong = submitted && selected && !correct;
                        return (
                          <button
                            key={optIndex}
                            onClick={() => setAnswers((prev) => {
                              const next = [...prev];
                              next[realIndex] = optIndex;
                              return next;
                            })}
                            className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${selected ? 'border-slate-900 bg-slate-900 text-white' : correct ? 'border-emerald-400 bg-emerald-50' : wrong ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
                          >
                            {String.fromCharCode(65 + optIndex)}. {opt}
                          </button>
                        );
                      })}
                    </div>
                    {submitted && (
                      <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                        <div className="mb-1 font-semibold">Pembahasan singkat</div>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="text-sm text-slate-600">Cakupan kisi-kisi yang dipakai</div>
                <div className="mt-2 text-sm leading-6 text-slate-700">
                  Futsal (1–6), Bola Voli (7–12), Bola Basket (13–25, 32), Senam Irama (26–31), Kebugaran Jasmani (33–35), Gaya Hidup Sehat (36–40).
                </div>
              </div>
            </main>
          </div>
        )}
      </div>
    </div>
  );
}
