import { useState } from "react";
import { Link } from "react-router-dom";
import "./PreTest.css";

const multipleChoiceQuestions = [
  {
    question: "What is a computer network?",
    options: [
      "A collection of connected computers and devices",
      "A type of computer program",
      "A computer monitor",
      "A storage device",
    ],
    answer: 0,
  },
  {
    question: "What is the main function of a router?",
    options: [
      "Connect devices in the same LAN",
      "Connect different networks",
      "Print documents",
      "Store files",
    ],
    answer: 1,
  },
  {
    question: "Which device connects multiple devices within a LAN?",
    options: [
      "Switch",
      "Modem",
      "Printer",
      "Scanner",
    ],
    answer: 0,
  },
  {
    question: "Which device provides wireless network access?",
    options: [
      "Switch",
      "Access Point",
      "Patch Panel",
      "Printer",
    ],
    answer: 1,
  },
  {
    question: "What does LAN stand for?",
    options: [
      "Large Area Network",
      "Local Area Network",
      "Long Access Network",
      "Local Access Node",
    ],
    answer: 1,
  },
  {
    question: "Which topology connects devices to a central device?",
    options: [
      "Ring",
      "Bus",
      "Star",
      "Mesh",
    ],
    answer: 2,
  },
  {
    question: "Which cable is commonly used for Ethernet networks?",
    options: [
      "UTP cable",
      "HDMI cable",
      "USB cable",
      "Power cable",
    ],
    answer: 0,
  },
  {
    question: "Which connector is commonly used with Ethernet cables?",
    options: [
      "RJ11",
      "RJ45",
      "USB-A",
      "HDMI",
    ],
    answer: 1,
  },
  {
    question: "What is the purpose of an IP address?",
    options: [
      "Identify a device on a network",
      "Increase monitor brightness",
      "Store files",
      "Power a computer",
    ],
    answer: 0,
  },
  {
    question: "Which protocol automatically assigns IP addresses to devices?",
    options: [
      "HTTP",
      "FTP",
      "DHCP",
      "HTML",
    ],
    answer: 2,
  },
  {
    question: "What is the function of a network cable?",
    options: [
      "Transmit data between network devices",
      "Display images",
      "Cool the computer",
      "Store network configurations",
    ],
    answer: 0,
  },
  {
    question: "What should you check first when a computer has no network connection?",
    options: [
      "Monitor resolution",
      "Network cable or connection",
      "Keyboard layout",
      "Wallpaper",
    ],
    answer: 1,
  },
  {
    question: "What is a default gateway used for?",
    options: [
      "Connect a device to another network",
      "Increase storage capacity",
      "Change the screen size",
      "Install applications",
    ],
    answer: 0,
  },
];

const essayQuestions = [
  "What is the main purpose of a computer network?",
  "Explain the basic function of a switch.",
  "What is the difference between a switch and a router?",
  "What is the purpose of an IP address?",
  "Explain what a LAN is.",
  "What is the function of an Access Point?",
  "Mention two common network topologies.",
  "What is the purpose of an RJ45 connector?",
  "What is the difference between a straight-through cable and a crossover cable?",
  "What is DHCP and what does it do?",
  "What should you check when a computer cannot connect to a network?",
  "Why is network troubleshooting important?",
];

function PreTest() {
  const [answers, setAnswers] = useState({});
  const [essayAnswers, setEssayAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChoice = (questionIndex, answerIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }));
  };

  const handleEssay = (questionIndex, value) => {
    setEssayAnswers((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  const calculateScore = () => {
    let correct = 0;

    multipleChoiceQuestions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        correct++;
      }
    });

    return correct;
  };

  const handleSubmit = () => {
    const choiceScore = calculateScore();

    localStorage.setItem(
      "netlabPreTestResult",
      JSON.stringify({
        correct: choiceScore,
        totalMultipleChoice: multipleChoiceQuestions.length,
        essayAnswers,
        completedAt: new Date().toISOString(),
      })
    );

    setSubmitted(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const choiceScore = calculateScore();
  const answeredEssay = essayQuestions.filter(
    (_, index) =>
      essayAnswers[index] &&
      essayAnswers[index].trim().length > 0
  ).length;

  if (submitted) {
    return (
      <div className="pretest-page">
        <div className="pretest-glow pretest-glow-one"></div>
        <div className="pretest-glow pretest-glow-two"></div>

        <main className="pretest-result">
          <div className="pretest-result-icon">✓</div>

          <span className="pretest-badge">
            PRE-TEST COMPLETED
          </span>

          <h1>Pre-Test Completed</h1>

          <p>
            Your answers have been saved successfully.
          </p>

          <div className="pretest-result-grid">
            <div className="pretest-result-card">
              <span>Multiple Choice</span>
              <strong>
                {choiceScore} / {multipleChoiceQuestions.length}
              </strong>
            </div>

            <div className="pretest-result-card">
              <span>Essay Answered</span>
              <strong>
                {answeredEssay} / {essayQuestions.length}
              </strong>
            </div>
          </div>

          <p className="pretest-result-note">
            Essay responses will require manual evaluation.
          </p>

          <div className="pretest-result-actions">
            <Link to="/home" className="pretest-secondary-button">
              ← Back to Home
            </Link>

            <Link to="/materi" className="pretest-primary-button">
              Start Learning →
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="pretest-page">
      <div className="pretest-glow pretest-glow-one"></div>
      <div className="pretest-glow pretest-glow-two"></div>

      <header className="pretest-header">
        <div className="pretest-header-inner">
          <Link to="/home" className="pretest-back-button">
            ← Home
          </Link>

          <div className="pretest-header-content">
            <span className="pretest-badge">
              NETLAB ASSESSMENT
            </span>

            <h1>Pre-Test</h1>

            <p>
              Test your initial knowledge of computer networking
              before starting your NETLAB learning journey.
            </p>
          </div>
        </div>
      </header>

      <main className="pretest-content">
        <div className="pretest-info">
          <div>
            <strong>25 Questions</strong>
            <span>13 Multiple Choice + 12 Essay</span>
          </div>

          <div>
            <strong>Initial Assessment</strong>
            <span>Answer based on your current knowledge</span>
          </div>
        </div>

        <section className="pretest-section">
          <div className="pretest-section-title">
            <span>01</span>
            <div>
              <h2>Multiple Choice</h2>
              <p>Select one answer for each question.</p>
            </div>
          </div>

          <div className="pretest-question-list">
            {multipleChoiceQuestions.map((item, index) => (
              <div className="pretest-question-card" key={index}>
                <div className="pretest-question-number">
                  {index + 1}
                </div>

                <div className="pretest-question-body">
                  <h3>{item.question}</h3>

                  <div className="pretest-options">
                    {item.options.map((option, optionIndex) => (
                      <label
                        className={`pretest-option ${
                          answers[index] === optionIndex
                            ? "selected"
                            : ""
                        }`}
                        key={optionIndex}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          checked={
                            answers[index] === optionIndex
                          }
                          onChange={() =>
                            handleChoice(index, optionIndex)
                          }
                        />

                        <span className="pretest-option-letter">
                          {String.fromCharCode(65 + optionIndex)}
                        </span>

                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pretest-section">
          <div className="pretest-section-title">
            <span>02</span>
            <div>
              <h2>Essay</h2>
              <p>
                Answer each question briefly and clearly.
              </p>
            </div>
          </div>

          <div className="pretest-essay-list">
            {essayQuestions.map((question, index) => (
              <div className="pretest-essay-card" key={index}>
                <div className="pretest-question-number">
                  {index + 14}
                </div>

                <div className="pretest-essay-body">
                  <h3>{question}</h3>

                  <textarea
                    value={essayAnswers[index] || ""}
                    onChange={(event) =>
                      handleEssay(index, event.target.value)
                    }
                    placeholder="Write your answer here..."
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="pretest-submit-area">
          <p>
            Make sure you have answered all questions before
            submitting the test.
          </p>

          <button
            className="pretest-submit-button"
            onClick={handleSubmit}
          >
            Submit Pre-Test →
          </button>
        </div>
      </main>
    </div>
  );
}

export default PreTest;