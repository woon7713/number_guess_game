import { useState } from "react";

const getRandomTarget = () => Math.floor(Math.random() * 100) + 1;

const NumberGuessGame = () => {
  const [target, setTarget] = useState(getRandomTarget);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [isWin, setIsWin] = useState(false);
  const [history, SetHistory] = useState([]);

  const handleSubmit = () => {
    console.log("타겟:", target);

    const num = Number(guess);
    if (isNaN(num) || num < 1 || num > 100) {
      setMessage("⚠️ 1부터 100 사이의 숫자를 입력하세요.");
      setGuess("");
      return;
    }

    //데이터 불변성을 위해 push를 사용 안함
    SetHistory([...history, num]);

    if (num === target) {
      setMessage(`🎉 정답! ${target}입니다.`);
      setIsWin(true);
    } else if (num < target) {
      setMessage("⬆️ 더 큰 수를 입력하세요.");
    } else {
      setMessage("⬇️ 더 작은 수를 입력하세요.");
    }

    setGuess("");
  };

  const handleRestart = () => {
    setTarget(getRandomTarget);
    setMessage("");
    setIsWin(false);
    SetHistory([]);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8 bg-white shadow-xl rounded-xl max-w-md">
      <h1 className="text-2xl font-bold">🎯 숫자 맞추기 게임</h1>
      <p className="text-gray-600">1~100 사이의 숫자를 맞춰보세요!</p>

      <input
        className="border border-gray-400 rounded-lg px-4 py-2 w-40 text-center focus:outline-none"
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        disabled={isWin}
      />
      <button
        className="bg-blue-400 text-white px-6 py-2 rounded-lg hover:bg-blue-500 disabled:opacity-50"
        onClick={handleSubmit}
        disabled={isWin}
      >
        {isWin ? "게임 끝" : "제출"}
      </button>

      <p className="text-lg font-medium">{message}</p>

      <div className="w-full">
        <h2 className="font-semibold mb-2 text-2xl">
          입력 기록 : {history.length} 회
        </h2>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {history.map((num, index) => (
            <li key={index}>{num}</li>
          ))}
        </ul>
      </div>

      {/*조건 만족시 보이는 ui*/}
      {isWin && (
        <button
          className="mt-4 px-5 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
          onClick={handleRestart}
        >
          재시작
        </button>
      )}
    </div>
  );
};

export default NumberGuessGame;
