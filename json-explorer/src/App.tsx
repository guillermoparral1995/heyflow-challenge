import { useState } from "react";
import JSONExplorer from "./JSONExplorer";

const MOCK_JSON =
  '{"date":"2021-10-27T07:49:14.896Z","hasError":false,"fields":[{"id":"4c212130","prop":"iban","value":"DE81200505501265402568","hasError":false}]}';

function App() {
  const [json, setJson] = useState<string>(MOCK_JSON);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJson(e.target.value);
  };

  return (
    <main className="flex flex-col gap-4 p-16 h-screen">
      <textarea
        className="w-96 h-48 border bg-slate-100 rounded-md"
        value={json}
        onChange={(e) => handleTextareaChange(e)}
      />
      <JSONExplorer json={json} />
    </main>
  );
}

export default App;
