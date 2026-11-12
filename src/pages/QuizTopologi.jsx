
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import "./QuizTopologi.css";

const questions = [
  {
    section: "A. Pengertian dan Konsep Topologi Jaringan",
    question: "Apa yang dimaksud dengan topologi jaringan komputer?",
    options: {
      A: "Kecepatan koneksi internet",
      B: "Susunan perangkat jaringan dan hubungan antarperangkat",
      C: "Jumlah pengguna yang terhubung ke jaringan",
      D: "Jenis sistem operasi yang digunakan komputer",
    },
    correct: "B",
    explanation:
      "Topologi jaringan menggambarkan bagaimana perangkat dan hubungan antarperangkat disusun dalam suatu jaringan komputer.",
  },
  {
    section: "A. Pengertian dan Konsep Topologi Jaringan",
    question: "Apa yang dijelaskan oleh topologi jaringan dalam sebuah jaringan komputer?",
    options: {
      A: "Spesifikasi komputer",
      B: "Jumlah data yang tersimpan",
      C: "Struktur fisik atau logis dari hubungan antarperangkat jaringan",
      D: "Biaya berlangganan internet",
    },
    correct: "C",
    explanation:
      "Topologi menggambarkan struktur fisik atau logis perangkat dan jalur komunikasi dalam jaringan.",
  },
  {
    section: "A. Pengertian dan Konsep Topologi Jaringan",
    question: "Mengapa topologi jaringan penting?",
    options: {
      A: "Secara otomatis meningkatkan kapasitas memori komputer",
      B: "Menggantikan seluruh perangkat jaringan",
      C: "Menghilangkan kebutuhan konfigurasi jaringan",
      D: "Memengaruhi komunikasi, kinerja, dan pengelolaan jaringan",
    },
    correct: "D",
    explanation:
      "Pemilihan topologi memengaruhi jalur komunikasi, kinerja jaringan, dan proses pemeliharaannya.",
  },
  {
    section: "A. Pengertian dan Konsep Topologi Jaringan",
    question: "Pernyataan manakah yang paling tepat menggambarkan desain topologi jaringan?",
    options: {
      A: "Struktur yang menentukan bagaimana perangkat jaringan saling terhubung",
      B: "Program untuk mengedit dokumen",
      C: "Metode untuk meningkatkan kapasitas penyimpanan",
      D: "Kata sandi keamanan komputer",
    },
    correct: "A",
    explanation:
      "Desain topologi menentukan struktur dan susunan perangkat serta hubungan antarperangkat dalam jaringan.",
  },
  {
    section: "B. Jenis dan Fungsi Topologi Jaringan",
    question: "Perangkat apa yang umumnya digunakan sebagai pusat koneksi pada topologi Star?",
    options: {
      A: "Repeater",
      B: "Modem",
      C: "Switch",
      D: "Printer",
    },
    correct: "C",
    explanation:
      "Pada topologi Star, setiap perangkat terhubung ke satu perangkat pusat yang umumnya berupa switch.",
  },
  {
    section: "B. Jenis dan Fungsi Topologi Jaringan",
    question: "Topologi manakah yang menggunakan satu kabel utama sebagai jalur komunikasi?",
    options: {
      A: "Topologi Star",
      B: "Topologi Bus",
      C: "Topologi Mesh",
      D: "Topologi Tree",
    },
    correct: "B",
    explanation:
      "Topologi Bus menghubungkan perangkat melalui satu kabel utama yang disebut backbone.",
  },
  {
    section: "B. Jenis dan Fungsi Topologi Jaringan",
    question: "Topologi manakah yang menghubungkan perangkat dalam bentuk lingkaran tertutup?",
    options: {
      A: "Topologi Star",
      B: "Topologi Bus",
      C: "Topologi Tree",
      D: "Topologi Ring",
    },
    correct: "D",
    explanation:
      "Topologi Ring menghubungkan perangkat dalam jalur melingkar sehingga membentuk sebuah lingkaran tertutup.",
  },
  {
    section: "B. Jenis dan Fungsi Topologi Jaringan",
    question: "Topologi manakah yang menyediakan beberapa jalur alternatif antarperangkat jaringan?",
    options: {
      A: "Topologi Mesh",
      B: "Topologi Bus",
      C: "Topologi Star",
      D: "Topologi Ring",
    },
    correct: "A",
    explanation:
      "Topologi Mesh menyediakan beberapa hubungan antarperangkat sehingga terdapat jalur komunikasi alternatif.",
  },
  {
    section: "B. Jenis dan Fungsi Topologi Jaringan",
    question: "Topologi manakah yang memiliki struktur hierarki dengan hubungan induk dan cabang?",
    options: {
      A: "Topologi Ring",
      B: "Topologi Bus",
      C: "Topologi Tree",
      D: "Topologi Mesh",
    },
    correct: "C",
    explanation:
      "Topologi Tree menggunakan struktur hierarki yang menyerupai cabang-cabang pohon.",
  },
  {
    section: "B. Jenis dan Fungsi Topologi Jaringan",
    question: "Apa yang dimaksud dengan topologi Hybrid?",
    options: {
      A: "Topologi yang hanya menggunakan satu kabel",
      B: "Gabungan dari dua atau lebih jenis topologi jaringan",
      C: "Topologi tanpa perangkat yang terhubung",
      D: "Jaringan yang tidak menggunakan jalur komunikasi",
    },
    correct: "B",
    explanation:
      "Topologi Hybrid merupakan gabungan dari dua atau lebih jenis topologi jaringan yang berbeda.",
  },
  {
    section: "C. Penggunaan Topologi dan Studi Kasus",
    question: "Pada topologi Star, apa yang dapat terjadi jika switch pusat mengalami kerusakan?",
    options: {
      A: "Hanya printer yang berhenti bekerja",
      B: "Jaringan otomatis berubah menjadi topologi Mesh",
      C: "Semua perangkat mendapatkan koneksi langsung satu sama lain",
      D: "Komunikasi antarperangkat yang terhubung dapat terganggu",
    },
    correct: "D",
    explanation:
      "Switch pusat merupakan titik penting pada topologi Star. Jika switch mengalami kerusakan, komunikasi perangkat yang terhubung dapat terputus.",
  },
  {
    section: "C. Penggunaan Topologi dan Studi Kasus",
    question: "Topologi manakah yang cocok digunakan pada kantor yang membutuhkan koneksi terpusat dan mudah dikelola?",
    options: {
      A: "Topologi Star",
      B: "Topologi Ring",
      C: "Topologi Bus",
      D: "Topologi Point-to-Point saja",
    },
    correct: "A",
    explanation:
      "Topologi Star umum digunakan di kantor karena perangkat terhubung ke switch pusat sehingga relatif mudah dikelola.",
  },
  {
    section: "C. Penggunaan Topologi dan Studi Kasus",
    question: "Sinyal jaringan perlu menjangkau jarak yang lebih jauh dari batas transmisi normalnya. Perangkat apa yang dapat membantu?",
    options: {
      A: "Printer",
      B: "Keyboard",
      C: "Repeater",
      D: "Monitor",
    },
    correct: "C",
    explanation:
      "Repeater memperkuat kembali atau meregenerasi sinyal agar dapat menjangkau jarak yang lebih jauh.",
  },
  {
    section: "C. Penggunaan Topologi dan Studi Kasus",
    question: "Apa yang dapat terjadi jika kabel utama (backbone) pada topologi Bus mengalami kerusakan?",
    options: {
      A: "Hanya switch pusat yang terdampak",
      B: "Komunikasi pada jaringan dapat terganggu",
      C: "Jaringan otomatis berubah menjadi topologi Star",
      D: "Semua komputer menerima sinyal yang lebih kuat",
    },
    correct: "B",
    explanation:
      "Kabel backbone merupakan bagian penting pada topologi Bus. Kerusakan kabel tersebut dapat mengganggu komunikasi jaringan.",
  },
  {
    section: "C. Penggunaan Topologi dan Studi Kasus",
    question: "Topologi manakah yang cocok digunakan ketika redundansi jaringan dan jalur alternatif sangat dibutuhkan?",
    options: {
      A: "Topologi Bus",
      B: "Topologi Ring",
      C: "Topologi Star",
      D: "Topologi Mesh",
    },
    correct: "D",
    explanation:
      "Topologi Mesh dapat menyediakan jalur alternatif sehingga komunikasi tetap dapat berlangsung ketika salah satu koneksi mengalami kerusakan.",
  },
  {
    section: "D. Repeater dan Fungsinya dalam Jaringan",
    question: "Apa fungsi utama dari perangkat Repeater?",
    options: {
      A: "Menerima, meregenerasi, dan mengirimkan kembali sinyal jaringan",
      B: "Memberikan alamat IP secara otomatis",
      C: "Menyimpan file jaringan",
      D: "Memblokir seluruh lalu lintas jaringan yang masuk",
    },
    correct: "A",
    explanation:
      "Repeater berfungsi meregenerasi dan mengirimkan kembali sinyal untuk membantu memperpanjang jarak transmisi.",
  },
  {
    section: "D. Repeater dan Fungsinya dalam Jaringan",
    question: "Pada lapisan OSI manakah Repeater tradisional bekerja?",
    options: {
      A: "Application Layer",
      B: "Network Layer",
      C: "Physical Layer",
      D: "Transport Layer",
    },
    correct: "C",
    explanation:
      "Repeater tradisional bekerja pada Physical Layer, yaitu lapisan pertama dalam model OSI.",
  },
  {
    section: "D. Repeater dan Fungsinya dalam Jaringan",
    question: "Mengapa Repeater digunakan dalam jaringan komputer?",
    options: {
      A: "Untuk menggantikan tabel routing pada router",
      B: "Untuk memperpanjang jarak jangkauan transmisi sinyal",
      C: "Untuk memberikan alamat MAC berbeda pada setiap perangkat",
      D: "Untuk mengenkripsi seluruh lalu lintas jaringan",
    },
    correct: "B",
    explanation:
      "Repeater membantu memperpanjang jarak transmisi dengan meregenerasi sinyal yang melemah.",
  },
  {
    section: "D. Repeater dan Fungsinya dalam Jaringan",
    question: "Pernyataan manakah yang benar mengenai Repeater tradisional?",
    options: {
      A: "Memberikan alamat IP kepada komputer",
      B: "Memilih rute terbaik antarjaringan",
      C: "Mengelola akun pengguna",
      D: "Tidak mengambil keputusan penerusan data berdasarkan alamat IP",
    },
    correct: "D",
    explanation:
      "Repeater tradisional bekerja dengan sinyal pada Physical Layer, bukan mengambil keputusan routing berdasarkan alamat IP.",
  },
  {
    section: "D. Repeater dan Fungsinya dalam Jaringan",
    question: "Apa hasil yang diharapkan ketika Repeater meregenerasi sinyal yang melemah?",
    options: {
      A: "Sinyal dapat melanjutkan perjalanan dengan jangkauan lebih jauh",
      B: "Jaringan mengubah rentang alamat IP",
      C: "Repeater berubah menjadi router",
      D: "Jaringan tidak lagi membutuhkan kabel",
    },
    correct: "A",
    explanation:
      "Regenerasi sinyal membantu sinyal menjangkau jarak transmisi yang lebih jauh. Repeater tidak meningkatkan bandwidth jaringan.",
  },
];

export default function QuizTopologi() {
  const [student, setStudent] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loadingStudent, setLoadingStudent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    const loadStudent = async () => {
      const username = localStorage.getItem("netlabUser");
      const role = localStorage.getItem("netlabRole");

      if (!username || role !== "student") {
        setSaveError("Silakan masuk menggunakan akun siswa untuk mengerjakan kuis.");
        setLoadingStudent(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, username, role")
        .eq("username", username)
        .eq("role", "student")
        .maybeSingle();

      if (error) {
        console.error("Gagal memuat profil siswa:", error);
        setSaveError("Profil siswa tidak dapat dimuat. Silakan coba kembali.");
      } else if (data) {
        setStudent(data);
      } else {
        setSaveError("Profil siswa tidak ditemukan. Silakan masuk kembali.");
      }

      setLoadingStudent(false);
    };

    loadStudent();
  }, []);

  const handleAnswer = (questionId, option) => {
    if (result) return;

    setAnswers((previous) => ({
      ...previous,
      [questionId]: option,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Object.keys(answers).length !== questions.length) {
      setSaveError("Silakan jawab seluruh 20 pertanyaan sebelum mengumpulkan kuis.");
      return;
    }

    if (!student) {
      setSaveError("Profil siswa tidak tersedia.");
      return;
    }

    setSubmitting(true);
    setSaveError("");

    const correctAnswers = questions.filter(
      (question, index) => answers[index] === question.correct
    ).length;

    const score = correctAnswers * 5;

    const answerDetails = questions.map((question, index) => ({
      question_id: index + 1,
      selected_answer: answers[index],
      correct_answer: question.correct,
      is_correct: answers[index] === question.correct,
    }));

    const { error } = await supabase.from("quiz_results").insert([
      {
        student_id: String(student.id),
        student_name: student.full_name,
        username: student.username,
        quiz_title: "Kuis Topologi Jaringan",
        score,
        correct_answers: correctAnswers,
        total_questions: questions.length,
        answers: answerDetails,
      },
    ]);

    setResult({
      score,
      correctAnswers,
      totalQuestions: questions.length,
    });

    if (error) {
      console.error("Gagal menyimpan hasil kuis:", error);
      setSaveError(
        "Nilai berhasil dihitung, tetapi hasil kuis gagal disimpan. Silakan hubungi guru."
      );
    } else {
      setSaved(true);
    }

    setSubmitting(false);
  };

  if (loadingStudent) {
    return (
      <div className="topology-quiz-page">
        <div className="quiz-loading">Memuat kuis...</div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="topology-quiz-page">
        <div className="quiz-result-card">
          <h2>Tidak Dapat Memulai Kuis</h2>
          <p>{saveError}</p>
          <Link to="/sign-in" className="quiz-primary-button">
            Masuk
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="topology-quiz-page">
      <header className="quiz-topbar">
        <Link to="/network-lab" className="quiz-back-link">
          ← Kembali ke Network Lab
        </Link>
        <span>ASESMEN NETLAB</span>
      </header>

      <main className="quiz-container">
        <section className="quiz-heading">
          <p className="quiz-eyebrow">ASESMEN NETWORK LAB</p>
          <h1>Kuis Topologi Jaringan</h1>
          <p>
            Uji pemahamanmu mengenai topologi jaringan dan fungsi Repeater.
          </p>

          <div className="quiz-info-grid">
            <div>
              <strong>20</strong>
              <span>Soal</span>
            </div>
            <div>
              <strong>100</strong>
              <span>Nilai Maksimal</span>
            </div>
            <div>
              <strong>5</strong>
              <span>Poin / Soal</span>
            </div>
          </div>
        </section>

        {result ? (
          <section className="quiz-result-card">
            <div className="quiz-result-icon">
              {result.score >= 75 ? "🏆" : result.score >= 50 ? "👏" : "📘"}
            </div>

            <p className="quiz-eyebrow">KUIS SELESAI</p>
            <h2>Hasil Kuis Kamu</h2>

            <div className="quiz-score">
              {result.score}
              <span>/100</span>
            </div>

            <p className="quiz-result-description">
              Kamu menjawab {result.correctAnswers} dari{" "}
              {result.totalQuestions} soal dengan benar.
            </p>

            <div className="quiz-result-progress">
              <div style={{ width: `${result.score}%` }} />
            </div>

            {saveError ? (
              <p className="quiz-error">{saveError}</p>
            ) : saved ? (
              <p className="quiz-save-success">
                ✓ Hasil kuis berhasil disimpan.
              </p>
            ) : (
              <p className="quiz-save-success">
                Menyimpan hasil kuis...
              </p>
            )}

            <div className="quiz-result-actions">
              <Link to="/network-lab" className="quiz-secondary-button">
                Kembali ke Network Lab
              </Link>
              <Link to="/" className="quiz-primary-button">
                Kembali ke Beranda
              </Link>
            </div>
          </section>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="quiz-student-info">
              <span>Siswa</span>
              <strong>{student.full_name}</strong>
              <small>@{student.username}</small>
            </div>

            <div className="quiz-progress-heading">
              <span>Soal Terjawab</span>
              <strong>
                {Object.keys(answers).length}/{questions.length}
              </strong>
            </div>

            <div className="quiz-progress-track">
              <div
                style={{
                  width: `${
                    (Object.keys(answers).length / questions.length) * 100
                  }%`,
                }}
              />
            </div>

            {questions.map((question, index) => (
              <section className="quiz-question-card" key={index}>
                <div className="quiz-question-top">
                  <span>SOAL {index + 1}</span>
                  <span>5 POIN</span>
                </div>

                <p className="quiz-section-label">{question.section}</p>
                <h3>{question.question}</h3>

                <div className="quiz-options">
                  {Object.entries(question.options).map(([key, value]) => (
                    <label
                      className={`quiz-option ${
                        answers[index] === key ? "selected" : ""
                      }`}
                      key={key}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={key}
                        checked={answers[index] === key}
                        onChange={() => handleAnswer(index, key)}
                      />

                      <span className="quiz-option-letter">{key}</span>
                      <span className="quiz-option-text">{value}</span>
                    </label>
                  ))}
                </div>
              </section>
            ))}

            {saveError && <p className="quiz-error">{saveError}</p>}

            <div className="quiz-submit-area">
              <p>
                Pastikan seluruh 20 pertanyaan sudah dijawab sebelum mengumpulkan kuis.
              </p>

              <button
                type="submit"
                className="quiz-primary-button"
                disabled={
                  submitting ||
                  Object.keys(answers).length !== questions.length
                }
              >
                {submitting ? "Mengumpulkan..." : "Kumpulkan Jawaban"}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
