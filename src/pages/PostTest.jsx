import { useState } from "react";
import { Link } from "react-router-dom";
import "./PostTest.css";

const multipleChoiceQuestions = [
  {
    question:
      "A school laboratory has several computers connected to a switch. All computers can communicate with each other, but they cannot access a different network. Which device is mainly responsible for connecting the LAN to another network?",
    options: [
      "Switch",
      "Router",
      "Access Point",
      "Network Printer",
    ],
    answer: 1,
  },
  {
    question:
      "A technician finds that a PC can communicate with other PCs in the same LAN but cannot access the internet. The IP address is correct, but the default gateway is empty. What should be configured?",
    options: [
      "DNS name",
      "Default gateway",
      "MAC address",
      "Monitor resolution",
    ],
    answer: 1,
  },
  {
    question:
      "A company wants to connect 20 computers to one central networking device. If one computer's cable fails, the other computers should continue working. Which topology is most appropriate?",
    options: [
      "Bus",
      "Ring",
      "Star",
      "Point-to-point",
    ],
    answer: 2,
  },
  {
    question:
      "A technician creates an Ethernet cable and the wire colors are not arranged according to either T568A or T568B. The cable does not work correctly. What is the most likely problem?",
    options: [
      "Incorrect wire arrangement",
      "Incorrect monitor settings",
      "Wrong computer name",
      "Low screen resolution",
    ],
    answer: 0,
  },
  {
    question:
      "A PC automatically receives an IP address beginning with 169.254. What does this situation most likely indicate?",
    options: [
      "The PC successfully received an IP from DHCP",
      "The PC could not obtain an IP address from DHCP",
      "The router is working normally",
      "The DNS server is responding correctly",
    ],
    answer: 1,
  },
  {
    question:
      "A user can ping the gateway using its IP address, but cannot access a website using its domain name. Which service should be investigated?",
    options: [
      "DHCP",
      "DNS",
      "FTP",
      "ARP",
    ],
    answer: 1,
  },
  {
    question:
      "A switch port indicator is completely off while the computer is powered on. What should the technician check first?",
    options: [
      "Ethernet cable and physical connection",
      "Web browser history",
      "Desktop wallpaper",
      "Printer settings",
    ],
    answer: 0,
  },
  {
    question:
      "A wireless client cannot find the school's Wi-Fi network, while other wireless devices can detect it. Which device should be checked first?",
    options: [
      "Access Point",
      "Network printer",
      "Patch panel",
      "Monitor",
    ],
    answer: 0,
  },
  {
    question:
      "Two computers use the same IP address on the same network. What problem can occur?",
    options: [
      "IP address conflict",
      "Faster network speed",
      "Better Wi-Fi coverage",
      "Automatic DNS repair",
    ],
    answer: 0,
  },
  {
    question:
      "A network administrator wants devices on a LAN to receive IP addresses automatically. Which service should be configured?",
    options: [
      "DHCP",
      "DNS",
      "HTTP",
      "SSH",
    ],
    answer: 0,
  },
  {
    question:
      "A technician replaces a damaged Ethernet cable, but the PC still cannot connect to the network. What should the technician do next?",
    options: [
      "Check the network adapter and configuration",
      "Change the monitor",
      "Restart the printer",
      "Change the keyboard",
    ],
    answer: 0,
  },
  {
    question:
      "A router's LAN interface is administratively down. What action is most directly related to restoring the interface?",
    options: [
      "Enable the interface",
      "Replace the monitor",
      "Change the desktop wallpaper",
      "Install a printer driver",
    ],
    answer: 0,
  },
  {
    question:
      "A PC can communicate with devices in its own subnet but cannot communicate with a device in another subnet. Which configuration should be investigated first?",
    options: [
      "Default gateway",
      "Screen resolution",
      "Keyboard language",
      "Printer paper size",
    ],
    answer: 0,
  },
];

const essayQuestions = [
  "A school laboratory has 20 computers connected to a switch. All computers can communicate with each other, but none can access the internet. Explain the possible causes and describe a logical troubleshooting process.",
  "A PC receives an IP address of 169.254.10.25. Explain what this address suggests and describe the steps you would take to identify the problem.",
  "A student reports that a computer can ping the gateway but cannot open websites by domain name. Explain how you would determine whether the problem is related to DNS.",
  "A newly installed switch has several active ports, but one computer cannot communicate with any other device. Explain the physical and logical checks you would perform.",
  "A network uses a star topology. One computer suddenly loses its connection while all other computers continue to work normally. Analyze why the topology helps isolate the problem and explain what you would inspect.",
  "A technician makes a UTP cable but the cable tester reports an incorrect wire sequence. Explain how you would identify and correct the problem using the T568A or T568B standard.",
  "A company wants employees to connect laptops wirelessly while maintaining access to the existing LAN. Explain how an Access Point can be integrated into the network.",
  "A PC has a valid IP address and subnet mask, but it cannot communicate with devices outside its local network. Explain the role of the default gateway and how an incorrect gateway can cause this problem.",
  "A network administrator discovers that two computers have the same IP address. Explain the symptoms that may occur and describe how you would resolve the conflict.",
  "A router is physically connected to a switch, but the connected network cannot reach the router. Explain the troubleshooting steps you would perform, starting from the physical layer.",
  "A laboratory network experiences intermittent connection problems. Cables appear connected, but the connection repeatedly disappears and returns. Analyze possible physical and logical causes and explain how you would investigate them.",
  "A school wants a network that can support multiple computers, internet access, wireless clients, and centralized network management. Propose a basic network design using suitable devices and explain the role of each device.",
];

function PostTest() {
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
      "netlabPostTestResult",
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
      <div className="posttest-page">
        <div className="posttest-glow posttest-glow-one"></div>
        <div className="posttest-glow posttest-glow-two"></div>

        <main className="posttest-result">
          <div className="posttest-result-icon">✓</div>

          <span className="posttest-badge">
            POST-TEST COMPLETED
          </span>

          <h1>Post-Test Completed</h1>

          <p>
            Your final assessment has been submitted successfully.
          </p>

          <div className="posttest-result-grid">
            <div className="posttest-result-card">
              <span>Multiple Choice</span>
              <strong>
                {choiceScore} / {multipleChoiceQuestions.length}
              </strong>
            </div>

            <div className="posttest-result-card">
              <span>Essay Answered</span>
              <strong>
                {answeredEssay} / {essayQuestions.length}
              </strong>
            </div>
          </div>

          <p className="posttest-result-note">
            Essay responses require manual evaluation.
          </p>

          <div className="posttest-result-actions">
            <Link
              to="/home"
              className="posttest-secondary-button"
            >
              ← Back to Home
            </Link>

            <Link
              to="/challenge"
              className="posttest-primary-button"
            >
              Explore Challenges →
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="posttest-page">
      <div className="posttest-glow posttest-glow-one"></div>
      <div className="posttest-glow posttest-glow-two"></div>

      <header className="posttest-header">
        <div className="posttest-header-inner">
          <Link to="/home" className="posttest-back-button">
            ← Home
          </Link>

          <div className="posttest-header-content">
            <span className="posttest-badge">
              NETLAB FINAL ASSESSMENT
            </span>

            <h1>Post-Test</h1>

            <p>
              Apply your networking knowledge to real-world
              situations, troubleshooting cases, and network
              problems.
            </p>
          </div>
        </div>
      </header>

      <main className="posttest-content">
        <div className="posttest-info">
          <div>
            <strong>25 Questions</strong>
            <span>13 Multiple Choice + 12 Essay</span>
          </div>

          <div>
            <strong>HOTS Assessment</strong>
            <span>
              Analyze situations and determine appropriate solutions
            </span>
          </div>
        </div>

        <section className="posttest-section">
          <div className="posttest-section-title">
            <span>01</span>

            <div>
              <h2>Case-Based Multiple Choice</h2>

              <p>
                Read each situation carefully before selecting an
                answer.
              </p>
            </div>
          </div>

          <div className="posttest-question-list">
            {multipleChoiceQuestions.map((item, index) => (
              <div
                className="posttest-question-card"
                key={index}
              >
                <div className="posttest-question-number">
                  {index + 1}
                </div>

                <div className="posttest-question-body">
                  <h3>{item.question}</h3>

                  <div className="posttest-options">
                    {item.options.map((option, optionIndex) => (
                      <label
                        className={`posttest-option ${
                          answers[index] === optionIndex
                            ? "selected"
                            : ""
                        }`}
                        key={optionIndex}
                      >
                        <input
                          type="radio"
                          name={`post-question-${index}`}
                          checked={
                            answers[index] === optionIndex
                          }
                          onChange={() =>
                            handleChoice(index, optionIndex)
                          }
                        />

                        <span className="posttest-option-letter">
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

        <section className="posttest-section">
          <div className="posttest-section-title">
            <span>02</span>

            <div>
              <h2>HOTS & Case Study Essay</h2>

              <p>
                Analyze each case and explain your reasoning and
                solution.
              </p>
            </div>
          </div>

          <div className="posttest-essay-list">
            {essayQuestions.map((question, index) => (
              <div
                className="posttest-essay-card"
                key={index}
              >
                <div className="posttest-question-number">
                  {index + 14}
                </div>

                <div className="posttest-essay-body">
                  <h3>{question}</h3>

                  <textarea
                    value={essayAnswers[index] || ""}
                    onChange={(event) =>
                      handleEssay(index, event.target.value)
                    }
                    placeholder="Explain your analysis and solution here..."
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="posttest-submit-area">
          <p>
            Review your answers carefully before submitting the
            final assessment.
          </p>

          <button
            className="posttest-submit-button"
            onClick={handleSubmit}
          >
            Submit Post-Test →
          </button>
        </div>
      </main>
    </div>
  );
}

export default PostTest;