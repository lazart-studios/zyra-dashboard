"use client"

import { useState, useEffect, useRef } from "react"

// Icons as simple SVG components
const Icons = {
  Bot: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M12 8V4H8" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  ),
  Message: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Play: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  ),
  Wrench: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  File: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  ),
  Settings: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Send: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <path d="m21.854 2.147-10.94 10.939" />
    </svg>
  ),
  Trash: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  ),
  Folder: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  ),
  ChevronRight: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  ChevronDown: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  Check: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  Clock: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Cpu: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" />
      <path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" />
    </svg>
  ),
  Heart: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
}

// Mock Data
const mockSkills = [
  { name: "github", desc: "GitHub CLI: issues PRs CI", icon: "🐙", color: "from-gray-500 to-gray-700" },
  { name: "weather", desc: "Weather API fetch", icon: "🌤️", color: "from-blue-400 to-cyan-400" },
  { name: "web_search", desc: "Brave Search queries", icon: "🔍", color: "from-orange-400 to-red-400" },
  { name: "memory_search", desc: "Semantic file search", icon: "🧠", color: "from-purple-400 to-pink-400" },
  { name: "sessions_spawn", desc: "Sub-agent spawning", icon: "👥", color: "from-green-400 to-emerald-400" },
  { name: "browser", desc: "Browser automation", icon: "🌐", color: "from-blue-500 to-indigo-500" },
  { name: "exec", desc: "Shell command execution", icon: "⚡", color: "from-yellow-400 to-orange-400" },
  { name: "cron", desc: "Cron job management", icon: "⏰", color: "from-red-400 to-pink-400" },
]

const mockAgents = [
  { id: "1", name: "Code Reviewer", status: "running", task: "Reviewing PR #42", time: "3m ago" },
  { id: "2", name: "Web Search", status: "completed", task: "Found 5 results", time: "5m ago" },
  { id: "3", name: "Research", status: "idle", task: null, time: null },
]

const workspaceFiles = [
  { name: "SOUL.md", type: "file", content: "# SOUL.md\nWho You Are..." },
  { name: "IDENTITY.md", type: "file", content: "# IDENTITY.md\nName: Zyra" },
  { name: "MEMORY.md", type: "file", content: "# MEMORY.md\nLong-term memory..." },
  { name: "HEARTBEAT.md", type: "file", content: "# HEARTBEAT.md\nPeriodic tasks..." },
  { name: "USER.md", type: "file", content: "# USER.md\nVlad Lazar" },
  { name: "TOOLS.md", type: "file", content: "# TOOLS.md\nLocal notes..." },
  { name: "memory/", type: "folder" },
  { name: "skills/", type: "folder" },
]

// Types
interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("chat")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [selectedFile, setSelectedFile] = useState<typeof workspaceFiles[0] | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    
    setMessages(prev => [...prev, userMsg])
    setInput("")
    
    // Simulate response
    setTimeout(() => {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Salut! Sunt Zyra, asistentul tău AI. Cum te pot ajuta astăzi? 💰",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, assistantMsg])
    }, 1000)
  }

  const clearMessages = () => setMessages([])

  const tabs = [
    { id: "chat", label: "Chat", icon: Icons.Message },
    { id: "agents", label: "Agenți", icon: Icons.Play },
    { id: "skills", label: "Skills", icon: Icons.Wrench },
    { id: "files", label: "Fișiere", icon: Icons.File },
    { id: "status", label: "Status", icon: Icons.Settings },
  ]

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-xl blur opacity-50" />
              <div className="relative bg-[#0a0a0a] p-2 rounded-xl border border-white/10">
                <Icons.Bot className="w-6 h-6 text-violet-400" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold gradient-text">Zyra Dashboard</h1>
              <p className="text-xs text-white/50">OpenClaw Control Center</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 glass-card px-3 py-1.5">
              <span className="status-dot status-online" />
              <span className="text-xs text-white/70">OpenRouter</span>
            </div>
            <div className="flex items-center gap-2 glass-card px-3 py-1.5 text-green-400">
              <span className="status-dot status-online" />
              <span className="text-xs">Online</span>
            </div>
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="flex md:hidden overflow-x-auto border-t border-white/10">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "text-white border-b-2 border-violet-500 bg-violet-500/10"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 border-r border-white/10 bg-[#0a0a0a]/50 backdrop-blur-xl p-4 gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? "text-violet-400" : ""}`} />
              {tab.label}
            </button>
          ))}
          
          <div className="mt-auto pt-4 border-t border-white/10">
            <div className="glass-card p-3 space-y-2">
              <div className="text-xs text-white/50">Heartbeat</div>
              <div className="flex items-center gap-2">
                <Icons.Clock className="w-4 h-4 text-cyan-400" />
                <span className="text-sm">La fiecare 2h</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden p-4">
          {/* Chat Tab */}
          {activeTab === "chat" && (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Icons.Message className="w-5 h-5 text-violet-400" />
                  Chat cu Zyra
                </h2>
                <button
                  onClick={clearMessages}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <Icons.Trash className="w-4 h-4" />
                  <span className="hidden sm:inline">Șterge</span>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto glass-card p-4 mb-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center text-white/40">
                    <Icons.Bot className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-lg">Salut! Sunt Zyra 💰</p>
                    <p className="text-sm">Cum te pot ajuta astăzi?</p>
                  </div>
                ) : (
                  messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        msg.role === "user" 
                          ? "bg-gradient-to-br from-blue-500 to-cyan-500" 
                          : "bg-gradient-to-br from-violet-500 to-purple-500"
                      }`}>
                        {msg.role === "user" ? "V" : "Z"}
                      </div>
                      <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-violet-500/30 to-purple-500/30 border border-violet-500/30"
                          : "glass-card"
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Scrie un mesaj..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all flex items-center gap-2"
                >
                  <Icons.Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Trimite</span>
                </button>
              </div>
            </div>
          )}

          {/* Agents Tab */}
          {activeTab === "agents" && (
            <div className="h-full flex flex-col">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Icons.Play className="w-5 h-5 text-cyan-400" />
                Agenți Activi
              </h2>
              <div className="grid gap-3 overflow-y-auto">
                {mockAgents.map(agent => (
                  <div key={agent.id} className="glass-card p-4 hover:border-white/20 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          agent.status === "running" ? "bg-blue-400 animate-pulse" :
                          agent.status === "completed" ? "bg-green-400" : "bg-white/30"
                        }`} />
                        <div>
                          <h3 className="font-medium">{agent.name}</h3>
                          {agent.task && (
                            <p className="text-sm text-white/60 mt-1">{agent.task}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-white/10 capitalize">
                        {agent.status}
                      </span>
                    </div>
                    {agent.time && (
                      <p className="text-xs text-white/40 mt-2 ml-6">{agent.time}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <div className="h-full flex flex-col">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Icons.Wrench className="w-5 h-5 text-amber-400" />
                Skills ({mockSkills.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 overflow-y-auto">
                {mockSkills.map(skill => (
                  <div key={skill.name} className="glass-card p-4 hover:border-white/20 transition-all group cursor-pointer">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-lg mb-3 group-hover:scale-110 transition-transform`}>
                      {skill.icon}
                    </div>
                    <h3 className="font-medium mb-1">{skill.name}</h3>
                    <p className="text-xs text-white/50">{skill.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Files Tab */}
          {activeTab === "files" && (
            <div className="h-full flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-64 glass-card overflow-y-auto">
                <div className="p-3 border-b border-white/10">
                  <h3 className="font-medium text-sm">Workspace</h3>
                </div>
                <div className="divide-y divide-white/5">
                  {workspaceFiles.map(file => (
                    <button
                      key={file.name}
                      onClick={() => setSelectedFile(file)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-all ${
                        selectedFile?.name === file.name
                          ? "bg-violet-500/20 text-violet-300"
                          : "text-white/70 hover:bg-white/5"
                      }`}
                    >
                      {file.type === "folder" ? (
                        <Icons.Folder className="w-4 h-4 text-blue-400" />
                      ) : (
                        <Icons.File className="w-4 h-4 text-white/50" />
                      )}
                      {file.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex-1 glass-card overflow-hidden flex flex-col">
                {selectedFile ? (
                  <>
                    <div className="p-3 border-b border-white/10 flex items-center justify-between">
                      <span className="font-medium text-sm">{selectedFile.name}</span>
                      <span className="text-xs text-white/40 capitalize">{selectedFile.type}</span>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto">
                      <pre className="text-sm text-white/60 whitespace-pre-wrap font-mono">
                        {selectedFile.content || "Selectează un fișier pentru a vedea conținutul"}
                      </pre>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-white/40">
                    <div className="text-center">
                      <Icons.File className="w-12 h-12 mx-auto mb-2 opacity-20" />
                      <p>Selectează un fișier</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Status Tab */}
          {activeTab === "status" && (
            <div className="h-full overflow-y-auto">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Icons.Settings className="w-5 h-5 text-green-400" />
                Status Sistem
              </h2>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* LLM Card */}
                <div className="glass-card p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                      <Icons.Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">LLM</h3>
                      <p className="text-xs text-white/50">OpenRouter</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Model</span>
                      <span className="text-violet-300">openrouter/auto</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Context</span>
                      <span>25K tokens</span>
                    </div>
                  </div>
                </div>

                {/* Heartbeat Card */}
                <div className="glass-card p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                      <Icons.Heart className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Heartbeat</h3>
                      <p className="text-xs text-white/50">Configurare</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Interval</span>
                      <span className="text-cyan-300">2 ore</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Activ</span>
                      <span>08:00 - 22:00</span>
                    </div>
                  </div>
                </div>

                {/* Agents Card */}
                <div className="glass-card p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Icons.Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Agenți</h3>
                      <p className="text-xs text-white/50">Limite</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Max Concurenți</span>
                      <span className="text-green-300">4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Subagenți Max</span>
                      <span>8</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Info */}
              <div className="mt-4 glass-card p-5">
                <h3 className="font-medium mb-3">Informații Sistem</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-white/50">Host</p>
                    <p className="font-mono text-white/80">vmi3084879</p>
                  </div>
                  <div>
                    <p className="text-white/50">OS</p>
                    <p className="font-mono text-white/80">Linux 6.8.0</p>
                  </div>
                  <div>
                    <p className="text-white/50">Node</p>
                    <p className="font-mono text-white/80">v25.6.1</p>
                  </div>
                  <div>
                    <p className="text-white/50">Timezone</p>
                    <p className="font-mono text-white/80">Europe/Bucharest</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-3 text-center text-xs text-white/40">
        <p>Zyra Dashboard v0.1.0 • Conectat la OpenClaw</p>
      </footer>
    </div>
  )
}
