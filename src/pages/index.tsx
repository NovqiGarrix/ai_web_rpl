import { getApiKey, getMe, summarize } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Conversation {
  message: string;
  from: string | 'AI Bot';
}

export default function Home() {

  const [isLoading, setIsLoading] = useState(false);

  const [conversations, setConversations] = useState<Array<Conversation>>([
    {
      from: 'AI Bot',
      message: 'What would you like to summarize?'
    }
  ]);

  const { data: user, isLoading: isGettingMe } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe
  });

  const { data: apiKey } = useQuery({
    queryKey: ["getApiKey"],
    queryFn: getApiKey,
    enabled: !!user?.id
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const message = formData.get('message')?.toString()!;

    setConversations((prev) => [...prev, { from: user?.name!, message }]);

    try {
      // Clear the current input
      event.currentTarget.reset();
      setIsLoading(true);

      // Kirim data ke API
      const aiResponse = await summarize(message, apiKey!);

      setConversations((prev) => [...prev, { from: 'AI Bot', message: aiResponse }]);
    } catch (error: any) {
      toast.error(error.message);
      // Remove last message from user
      setConversations((prev) => prev.slice(0, prev.length - 1));
    } finally {
      setIsLoading(false);
    }

  }

  useEffect(() => {
    if (!user?.id && !isGettingMe) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }, [user?.id, isGettingMe]);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center font-poppins"
    >

      <h1 className="text-3xl font-semibold text-gray-700">Welcome to Summarize AI</h1>
      <span className="text-start">Summarize everything!</span>

      <div className="max-w-2xl w-full mt-4">
        {/* LIST OF RESPONSES */}
        <div className="w-full h-full max-h-96 overflow-y-auto p-5">
          {conversations.map(({ from, message }, index) => (
            <div key={`${from}-${index}`} className={`mt-3 ${index % 2 !== 0 ? 'flex flex-col items-end' : 'flex flex-col items-start'}`}>
              <span className="font-semibold">{from}</span>

              <div className="bg-gray-800 inline-block rounded-lg p-2 px-3">
                <p className="text-gray-50 text-sm">{message}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="w-full flex mt-5 space-x-4 items-start p-5">
          <textarea
            name="message"
            className="flex-grow p-3 px-4 text-sm bg-transparent ring-2 ring-gray-400 focus:ring-gray-700 rounded-lg font-poppins placeholder:text-[#8C8C8C] h-full w-full text-gray-800 focus:outline-none"
            placeholder="Type your message here..."
            required
          ></textarea>
          <button disabled={isLoading} className="disabled:opacity-70 bg-gray-700 hover:bg-gray-800 text-gray-50 p-2 text-sm px-3 w-24 rounded-lg">
            {isLoading ? 'Loading...' : 'Send'}
          </button>
        </form>
      </div>
    </main>
  )
}
