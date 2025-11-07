'use client';

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import { clsx } from "clsx";

type Message = {
  id: string;
  from: "me" | "them";
  content: string;
  time: string;
  status?: "sent" | "delivered" | "read";
};

type Chat = {
  id: string;
  name: string;
  avatar: string;
  status: string;
  lastSeen: string;
  unread: number;
  messages: Message[];
  about: string;
};

const initialChats: Chat[] = [
  {
    id: "1",
    name: "Team Mustafizur",
    avatar: "https://i.pravatar.cc/100?img=68",
    status: "Always ready to ship 🚀",
    lastSeen: "online",
    unread: 3,
    about: "Building the future with precision and heart.",
    messages: [
      {
        id: "m1",
        from: "them",
        content: "Morning! Sprint planning slides are synced in Notion.",
        time: "09:15",
        status: "read"
      },
      {
        id: "m2",
        from: "me",
        content: "Perfect, reviewing now. Let’s keep it crisp for demo.",
        time: "09:17",
        status: "read"
      },
      {
        id: "m3",
        from: "them",
        content: "Also queued a patched build for QA to verify.",
        time: "09:18",
        status: "delivered"
      }
    ]
  },
  {
    id: "2",
    name: "Sara Miles",
    avatar: "https://i.pravatar.cc/100?img=47",
    status: "Design lead · DMs open",
    lastSeen: "last seen today at 08:41",
    unread: 0,
    about: "Thoughtful product design and inclusive experiences.",
    messages: [
      {
        id: "m4",
        from: "them",
        content: "Pushed the refreshed iconography into Figma.",
        time: "00:53",
        status: "read"
      },
      {
        id: "m5",
        from: "me",
        content:
          "Absolutely love it. We’ll align the chat header color with this set.",
        time: "01:02",
        status: "read"
      }
    ]
  },
  {
    id: "3",
    name: "Ops Pulse",
    avatar: "https://i.pravatar.cc/100?img=19",
    status: "Automation keeps the lights on",
    lastSeen: "last seen yesterday at 22:03",
    unread: 1,
    about: "Operations, reliability and customer joy.",
    messages: [
      {
        id: "m6",
        from: "them",
        content:
          "Incident bridge closed — latency stabilized after the hotfix.",
        time: "22:01",
        status: "delivered"
      }
    ]
  }
];

function getCurrentTime(): string {
  const now = new Date();
  return now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default function Home() {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [selectedChatId, setSelectedChatId] = useState<string>(
    initialChats[0]?.id ?? ""
  );
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");

  const selectedChat = useMemo(
    () => chats.find((chat) => chat.id === selectedChatId) ?? chats[0],
    [chats, selectedChatId]
  );

  const filteredChats = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return chats;
    return chats.filter(
      (chat) =>
        chat.name.toLowerCase().includes(term) ||
        chat.messages.some((m) => m.content.toLowerCase().includes(term))
    );
  }, [chats, search]);

  const handleSendMessage = () => {
    if (!draft.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      from: "me",
      content: draft.trim(),
      time: getCurrentTime(),
      status: "sent"
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              unread: 0,
              lastSeen: "online"
            }
          : chat
      )
    );
    setDraft("");
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 md:px-10">
      <div className="grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-3xl bg-chat-panel/80 shadow-panel backdrop-blur-md ring-1 ring-white/5 md:grid-cols-[360px_1fr]">
        <aside className="flex flex-col border-r border-white/5 bg-chat.surface/70">
          <header className="flex items-center gap-3 px-6 pb-6 pt-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-xl font-semibold text-brand">
              MC
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand">
                Mustafizur
              </p>
              <h1 className="text-lg font-bold text-white">mustafizur chat</h1>
              <p className="text-sm text-teal-200/70">
                Crafted for velocity and calm flow.
              </p>
            </div>
          </header>

          <div className="px-6">
            <div className="relative">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search conversations"
                className="w-full rounded-2xl border border-white/10 bg-chat.surface px-4 py-3 text-sm text-white shadow-inner shadow-black/30 outline-none ring-emerald-400/70 transition focus:border-brand focus:ring-2"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs uppercase tracking-widest text-white/30">
                search
              </span>
            </div>
          </div>

          <div className="mt-6 flex-1 space-y-1 overflow-y-auto px-2 pb-6">
            <AnimatePresence initial={false}>
              {filteredChats.map((chat) => {
                const isActive = chat.id === selectedChat?.id;
                const lastMessage = chat.messages.at(-1);
                return (
                  <motion.button
                    key={chat.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    onClick={() => setSelectedChatId(chat.id)}
                    className={clsx(
                      "flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left transition",
                      isActive
                        ? "bg-brand/20 shadow-lg shadow-brand/10"
                        : "hover:bg-white/5"
                    )}
                  >
                    <div
                      className={clsx(
                        "relative h-12 w-12 overflow-hidden rounded-2xl",
                        isActive && "ring-2 ring-brand"
                      )}
                    >
                      <Image
                        src={chat.avatar}
                        alt={chat.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-white">
                          {chat.name}
                        </p>
                        <span className="text-xs uppercase tracking-wide text-white/50">
                          {chat.lastSeen}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs text-white/60">
                        {lastMessage?.content ?? chat.about}
                      </p>
                    </div>
                    {chat.unread > 0 && (
                      <span className="flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
                        {chat.unread}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </aside>

        <section className="relative flex min-h-[620px] flex-col bg-chat.surface/50">
          {selectedChat ? (
            <>
              <header className="flex items-center gap-4 border-b border-white/5 bg-chat.surface/60 px-8 py-6">
                <div className="relative h-12 w-12 overflow-hidden rounded-2xl ring-2 ring-brand/60">
                  <Image
                    src={selectedChat.avatar}
                    alt={selectedChat.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        {selectedChat.name}
                      </h2>
                      <p className="text-sm text-emerald-200/80">
                        {selectedChat.status}
                      </p>
                    </div>
                    <div className="hidden items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/40 md:flex">
                      <span>Voice</span>
                      <span>Video</span>
                      <span>Pin</span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-white/40">{selectedChat.about}</p>
                </div>
              </header>

              <div className="relative flex-1 overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,211,102,0.09),transparent_60%)]" />
                <div className="relative h-full overflow-y-auto px-8 py-10 space-y-6">
                  <AnimatePresence initial={false}>
                    {selectedChat.messages.map((message) => (
                      <motion.div
                        key={message.id}
                        layout
                        initial={{
                          opacity: 0,
                          y: message.from === "me" ? 20 : -20,
                          scale: 0.96
                        }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                        className={clsx(
                          "flex w-full",
                          message.from === "me" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={clsx(
                            "max-w-[72%] rounded-3xl px-5 py-4 text-sm leading-relaxed shadow-lg shadow-black/40 backdrop-blur-sm",
                            message.from === "me"
                              ? "rounded-br-md bg-chat.bubble.outgoing text-emerald-100"
                              : "rounded-bl-md bg-chat.bubble.incoming text-white/90"
                          )}
                        >
                          <p>{message.content}</p>
                          <div className="mt-3 flex items-center justify-end gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40">
                            <span>{message.time}</span>
                            {message.from === "me" && (
                              <span>
                                {message.status === "read"
                                  ? "READ"
                                  : message.status === "delivered"
                                  ? "DELIVERED"
                                  : "SENT"}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className="border-t border-white/5 bg-chat.surface/70 px-8 pb-8 pt-6">
                <div className="flex items-end gap-4 rounded-3xl border border-white/10 bg-chat.panel/80 px-5 py-4 shadow-inner shadow-black/40">
                  <textarea
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    placeholder="Send a message"
                    className="h-12 min-h-[3rem] flex-1 resize-none bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white shadow shadow-brand/40 transition hover:bg-brand.dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                    aria-label="Send message"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12L3 3l18 9-18 9 3-9zm0 0l12 0"
                      />
                    </svg>
                  </button>
                </div>
                <p className="mt-3 text-[10px] uppercase tracking-[0.35em] text-white/30">
                  mustafizur chat • encrypted by design • inspired by the flow of
                  WhatsApp
                </p>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-6 text-center text-white/60">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="rounded-full bg-brand/10 p-10"
              >
                <span className="text-5xl">✨</span>
              </motion.div>
              <div className="max-w-sm space-y-3">
                <h2 className="text-2xl font-semibold text-white">
                  Welcome to mustafizur chat
                </h2>
                <p className="text-sm">
                  Select a chat from the left to start a conversation. Your
                  messages stay private and synced across devices instantly.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
