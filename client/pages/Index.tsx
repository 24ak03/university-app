import { useEffect, useMemo, useRef, useState, forwardRef } from "react";

// Types
type Comment = { author: string; content: string };
type Post = {
  id: number;
  author: string;
  university: string;
  title: string;
  content: string;
  image: string | null;
  likes: number;
  comments: Comment[];
  liked: boolean;
  timestamp: string;
};

type Conversation = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
};

type ChatMessage = { sender: "me" | "them"; content: string; time: string };

type User = { name: string; email: string; university: string } | null;

type Profile = {
  name: string;
  email: string;
  university: string;
  avatar: string;
  joinDate: string;
};

type Page = "landing" | "signup" | "signin" | "feed" | "profile";

function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center shadow-sm">
        <span className="text-white font-extrabold text-sm leading-none">UC</span>
      </div>
      <span className="text-xl font-extrabold tracking-tight text-[#1e293b]">UniConnect</span>
    </div>
  );
}

function PrimaryButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "solid" | "outline" },
) {
  const { className = "", variant = "solid", ...rest } = props;
  const base =
    "px-4 py-2 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const solid =
    "bg-[#2563EB] text-white hover:bg-[#1d4ed8] focus:ring-[#2563EB] focus:ring-offset-white";
  const outline =
    "border border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white focus:ring-[#2563EB] focus:ring-offset-white";
  return <button className={`${base} ${variant === "solid" ? solid : outline} ${className}`} {...rest} />;
}

const TextInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function TextInput(
  props,
  ref,
) {
  const { className = "", ...rest } = props;
  return (
    <input
      ref={ref}
      className={`w-full px-3 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent ${className}`}
      {...rest}
    />
  );
});

function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { className = "", children, ...rest } = props;
  return (
    <select
      className={`w-full px-3 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent ${className}`}
      {...rest}
    >
      {children}
    </select>
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className = "", ...rest } = props;
  return (
    <textarea
      className={`w-full min-h-[120px] px-3 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent ${className}`}
      {...rest}
    />
  );
}

export default function Index() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [user, setUser] = useState<User>(null);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Aida Nazarbayeva",
      university: "Nazarbayev University",
      title: "Study Group for Advanced Mathematics",
      content:
        "Looking for students to join our study group for Advanced Calculus. We meet every Tuesday and Thursday at 6 PM in the library. All levels welcome!",
      image: "https://placehold.co/400x200/2563EB/ffffff?text=Study+Group",
      likes: 12,
      comments: [
        {
          author: "Bekzat Tolegenov",
          content: "Count me in! What topics are you covering this week?",
        },
        {
          author: "Amina Kassymova",
          content: "This sounds great. Can I bring my notes from last semester?",
        },
      ],
      liked: false,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      author: "Daniyar Suleimenov",
      university: "Al-Farabi Kazakh National University",
      title: "Photography Club Meeting",
      content:
        "Join us this Saturday for a photography walk around Kok-Tobe! We will be practicing landscape and portrait photography. Bring your cameras or smartphones.",
      image: "https://placehold.co/400x200/10B981/ffffff?text=Photography",
      likes: 8,
      comments: [{ author: "Sara Mukanova", content: "What time should we meet?" }],
      liked: true,
      timestamp: "4 hours ago",
    },
    {
      id: 3,
      author: "Zhanel Omarova",
      university: "KIMEP University",
      title: "Free Tutoring in Economics",
      content:
        "Offering free tutoring sessions for Microeconomics and Macroeconomics. I am a senior student with high grades in these subjects. Contact me if interested!",
      image: null,
      likes: 15,
      comments: [],
      liked: false,
      timestamp: "1 day ago",
    },
  ]);

  const universities = useMemo(
    () => [
      "Nazarbayev University",
      "Al-Farabi Kazakh National University",
      "KIMEP University",
      "Satbayev University",
      "Eurasian National University",
      "Kazakh-British Technical University",
    ],
    [],
  );

  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState<{ title: string; content: string; image: string | null }>({
    title: "",
    content: "",
    image: null,
  });
  const [showComments, setShowComments] = useState<Record<number, boolean>>({});

  const [chatOpen, setChatOpen] = useState(false);
  const [conversations] = useState<Conversation[]>([
    { id: 1, name: "Aida Nazarbayeva", lastMessage: "Thanks for the study notes!", time: "10:30 AM", unread: 2 },
    { id: 2, name: "Bekzat Tolegenov", lastMessage: "See you at the library", time: "Yesterday", unread: 0 },
  ]);
  const [activeChat, setActiveChat] = useState<Conversation | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const [signUpData, setSignUpData] = useState({ fullName: "", email: "", password: "", university: "" });
  const [signInData, setSignInData] = useState({ email: "", password: "" });

  const [userProfile, setUserProfile] = useState<Profile>({
    name: "Aigerim Zhaksylyk",
    email: "aigerim.zhaksylyk@nu.edu.kz",
    university: "Nazarbayev University",
    avatar: "https://placehold.co/100x100/2563EB/ffffff?text=AZ",
    joinDate: "September 2023",
  });
  const [editingProfile, setEditingProfile] = useState(false);

  // Effects
  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  useEffect(() => {
    // simple search/filter sync
    let list = [...posts];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) => p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q),
      );
    }
    if (selectedUniversity) {
      list = list.filter((p) => p.university === selectedUniversity);
    }
    setFilteredPosts(list);
  }, [posts, searchQuery, selectedUniversity]);

  // Actions
  function navigateTo(page: Page) {
    setCurrentPage(page);
    if (page === "feed") {
      setFilteredPosts(posts);
    }
  }

  function signUp(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const { fullName, email, password, university } = signUpData;
    if (fullName && email && password && university) {
      const newUser = { name: fullName, email, university };
      setUser(newUser);
      setUserProfile((prev) => ({ ...prev, name: fullName, email, university }));
      navigateTo("feed");
    }
  }

  function signIn(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const { email, password } = signInData;
    if (email && password) {
      setUser({ name: "Aigerim Zhaksylyk", email, university: "Nazarbayev University" });
      navigateTo("feed");
    }
  }

  function signOut() {
    setUser(null);
    navigateTo("landing");
  }

  function toggleLike(postId: number) {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p,
      ),
    );
  }

  function toggleComments(postId: number) {
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  }

  function createPost(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!user) return;
    if (newPost.title && newPost.content) {
      const post: Post = {
        id: posts.length + 1,
        author: user.name,
        university: user.university,
        title: newPost.title,
        content: newPost.content,
        image: newPost.image,
        likes: 0,
        comments: [],
        liked: false,
        timestamp: "Just now",
      };
      setPosts((prev) => [post, ...prev]);
      setNewPost({ title: "", content: "", image: null });
      setShowCreatePost(false);
    }
  }

  function openChat(conversation: Conversation) {
    setActiveChat(conversation);
    setChatMessages([
      { sender: "them", content: "Hey! How are your studies going?", time: "10:25 AM" },
      { sender: "me", content: "Going well! Thanks for asking. How about you?", time: "10:27 AM" },
      { sender: "them", content: "Thanks for the study notes!", time: "10:30 AM" },
    ]);
    setChatOpen(true);
  }

  function sendMessage(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (newMessage.trim()) {
      setChatMessages((prev) => [
        ...prev,
        { sender: "me", content: newMessage.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
      ]);
      setNewMessage("");
    }
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setNewPost((prev) => ({ ...prev, image: "https://placehold.co/400x200/2563EB/ffffff?text=Uploaded+Image" }));
    }
  }

  // Refs
  const createPostTitleRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (showCreatePost) createPostTitleRef.current?.focus();
  }, [showCreatePost]);

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] font-sans">
      {currentPage === "landing" && (
        <div className="min-h-screen flex flex-col">
          <header className="bg-white shadow-sm border-b border-[#e2e8f0]">
            <div className="max-w-7xl mx-auto px-4 max-sm:px-6 py-4">
              <div className="flex justify-between items-center">
                <Logo />
                <div className="flex gap-3">
                  <PrimaryButton variant="outline" onClick={() => navigateTo("signin")}>Sign In</PrimaryButton>
                  <PrimaryButton onClick={() => navigateTo("signup")}>Sign Up</PrimaryButton>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 flex items-center justify-center px-4 max-sm:px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl max-sm:text-4xl font-extrabold text-[#1e293b] mb-6 tracking-tight">
                Connect with your university community
              </h1>
              <p className="text-xl max-sm:text-lg text-[#64748b] mb-8 max-w-2xl mx-auto">
                Join thousands of students across Kazakhstan. Share knowledge, make friends, and build your academic network.
              </p>
              <div className="flex gap-4 justify-center max-sm:flex-col max-sm:items-center">
                <PrimaryButton className="px-8 py-3 text-lg" onClick={() => navigateTo("signup")}>Get Started</PrimaryButton>
                <PrimaryButton className="px-8 py-3 text-lg" variant="outline" onClick={() => navigateTo("signin")}>
                  Sign In
                </PrimaryButton>
              </div>

              <div className="mt-16 grid grid-cols-1 max-lg:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e2e8f0]">
                  <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1e293b] mb-2">Connect & Chat</h3>
                  <p className="text-[#64748b]">Real-time messaging with fellow students from your university</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e2e8f0]">
                  <div className="w-12 h-12 bg-[#dcfce7] rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1e293b] mb-2">Share Knowledge</h3>
                  <p className="text-[#64748b]">Post study materials, ask questions, and help each other succeed</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e2e8f0]">
                  <div className="w-12 h-12 bg-[#fef3c7] rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-[#d97706]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1e293b] mb-2">Build Network</h3>
                  <p className="text-[#64748b]">Connect with students from universities across Kazakhstan</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}

      {currentPage === "signup" && (
        <div className="min-h-screen flex items-center justify-center px-4 max-sm:px-6 bg-[#f8fafc]">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-[#e2e8f0] p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Logo />
              </div>
              <h2 className="text-2xl font-extrabold text-[#1e293b]">Create Account</h2>
              <p className="text-[#64748b] mt-2">Join your university community</p>
            </div>
            <form className="space-y-6" onSubmit={signUp}>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Full Name</label>
                <TextInput
                  value={signUpData.fullName}
                  onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                  type="text"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Email</label>
                <TextInput
                  value={signUpData.email}
                  onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                  type="email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Password</label>
                <TextInput
                  value={signUpData.password}
                  onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                  type="password"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">University</label>
                <SelectInput
                  value={signUpData.university}
                  onChange={(e) => setSignUpData({ ...signUpData, university: e.target.value })}
                  required
                >
                  <option value="">Select your university</option>
                  {universities.map((u) => (
                    <option value={u} key={u}>
                      {u}
                    </option>
                  ))}
                </SelectInput>
              </div>
              <PrimaryButton type="submit" className="w-full">Sign Up</PrimaryButton>
            </form>
            <div className="mt-6 text-center">
              <p className="text-[#64748b]">
                Already have an account?{" "}
                <button
                  onClick={() => navigateTo("signin")}
                  className="text-[#2563EB] hover:underline font-medium"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {currentPage === "signin" && (
        <div className="min-h-screen flex items-center justify-center px-4 max-sm:px-6 bg-[#f8fafc]">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-[#e2e8f0] p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Logo />
              </div>
              <h2 className="text-2xl font-extrabold text-[#1e293b]">Welcome Back</h2>
              <p className="text-[#64748b] mt-2">Sign in to your account</p>
            </div>
            <form className="space-y-6" onSubmit={signIn}>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Email</label>
                <TextInput
                  value={signInData.email}
                  onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                  type="email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-2">Password</label>
                <TextInput
                  value={signInData.password}
                  onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                  type="password"
                  required
                />
              </div>
              <PrimaryButton type="submit" className="w-full">Sign In</PrimaryButton>
            </form>
            <div className="mt-6 text-center">
              <p className="text-[#64748b]">
                Don't have an account?{" "}
                <button
                  onClick={() => navigateTo("signup")}
                  className="text-[#2563EB] hover:underline font-medium"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {currentPage === "feed" && (
        <div className="min-h-screen bg-[#f8fafc]">
          <nav className="bg-white shadow-sm border-b border-[#e2e8f0] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 max-sm:px-6">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center gap-4">
                  <Logo />
                  <div className="hidden md:flex items-center gap-3">
                    <TextInput
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search posts or authors..."
                      className="w-80"
                    />
                    <SelectInput
                      value={selectedUniversity}
                      onChange={(e) => setSelectedUniversity(e.target.value)}
                      className="w-64"
                    >
                      <option value="">All Universities</option>
                      {universities.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </SelectInput>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setChatOpen(true)}
                    className="p-2 text-[#64748b] hover:text-[#2563EB] transition-colors relative"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.681L3 21l2.681-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"></path>
                    </svg>
                    <span className="absolute -top-1 -right-1 bg-[#ef4444] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      2
                    </span>
                  </button>
                  <button
                    onClick={() => navigateTo("profile")}
                    className="flex items-center gap-2 p-2 hover:bg-[#f1f5f9] rounded-lg transition-colors"
                  >
                    <img
                      src="https://placehold.co/32x32/2563EB/ffffff?text=AZ"
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-[#1e293b] font-medium hidden sm:inline">
                      {user ? user.name : "Profile"}
                    </span>
                  </button>
                  <button
                    onClick={signOut}
                    className="text-[#64748b] hover:text-[#ef4444] transition-colors hidden sm:inline-flex"
                    title="Sign out"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="md:hidden pb-3">
                <TextInput
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts..."
                />
              </div>
            </div>
          </nav>

          <main className="max-w-4xl mx-auto px-4 max-sm:px-6 py-6">
            <div className="mb-6">
              <button
                onClick={() => setShowCreatePost(true)}
                className="w-full bg-white border border-[#e2e8f0] rounded-xl p-4 text-left hover:border-[#2563EB] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://placehold.co/40x40/2563EB/ffffff?text=AZ"
                    alt="Your avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-[#64748b]">What's on your mind?</span>
                </div>
              </button>
            </div>

            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] overflow-hidden">
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-[#1e293b]">{post.title}</h3>
                        <div className="mt-1 text-sm text-[#64748b]">
                          <span className="font-medium text-[#1e293b]">{post.author}</span>
                          <span className="mx-2">•</span>
                          <span>{post.university}</span>
                          <span className="mx-2">•</span>
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-[#334155] leading-relaxed">{post.content}</p>
                    {post.image && (
                      <img
                        src={post.image}
                        alt="Post"
                        className="mt-4 w-full rounded-lg object-cover"
                      />
                    )}
                    <div className="mt-4 flex items-center gap-4">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border transition-colors ${
                          post.liked
                            ? "bg-[#2563EB] text-white border-[#2563EB]"
                            : "bg-white text-[#1e293b] border-[#e2e8f0] hover:border-[#2563EB]"
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 9l-2-2-2 2m0 6l2 2 2-2" />
                        </svg>
                        <span>{post.likes} Like{post.likes === 1 ? "" : "s"}</span>
                      </button>
                      <button
                        onClick={() => toggleComments(post.id)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border bg-white text-[#1e293b] border-[#e2e8f0] hover:border-[#2563EB]"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.681L3 21l2.681-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                        </svg>
                        <span>Comments ({post.comments.length})</span>
                      </button>
                    </div>
                  </div>
                  {showComments[post.id] && (
                    <div className="border-t border-[#e2e8f0] p-5 bg-[#f8fafc]">
                      <div className="space-y-4">
                        {post.comments.length === 0 && (
                          <p className="text-sm text-[#64748b]">No comments yet</p>
                        )}
                        {post.comments.map((c, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#dbeafe] flex items-center justify-center text-[#2563EB] font-semibold">
                              {c.author.slice(0, 1)}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm">
                                <span className="font-medium text-[#1e293b]">{c.author}</span>
                                <span className="text-[#475569]"> — {c.content}</span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </main>

          {showCreatePost && (
            <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="w-full max-w-lg bg-white rounded-xl shadow-xl border border-[#e2e8f0] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#1e293b]">Create Post</h3>
                  <button
                    onClick={() => setShowCreatePost(false)}
                    className="text-[#64748b] hover:text-[#1e293b]"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>
                <form className="space-y-4" onSubmit={createPost}>
                  <TextInput
                    ref={createPostTitleRef}
                    placeholder="Title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  />
                  <Textarea
                    placeholder="What's on your mind?"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  />
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Image</label>
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                    {newPost.image && (
                      <img src={newPost.image} alt="Preview" className="mt-3 rounded-md" />
                    )}
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <PrimaryButton variant="outline" type="button" onClick={() => setShowCreatePost(false)}>
                      Cancel
                    </PrimaryButton>
                    <PrimaryButton type="submit">Post</PrimaryButton>
                  </div>
                </form>
              </div>
            </div>
          )}

          {chatOpen && (
            <div className="fixed inset-0 z-50 flex">
              <div className="flex-1" onClick={() => setChatOpen(false)} />
              <div className="w-full max-w-2xl h-full bg-white border-l border-[#e2e8f0] shadow-xl flex">
                <div className="w-72 border-r border-[#e2e8f0] p-4 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[#1e293b] font-semibold">Messages</h3>
                    <button className="text-[#64748b]" onClick={() => setChatOpen(false)} aria-label="Close">
                      ✕
                    </button>
                  </div>
                  <div className="space-y-2 overflow-auto">
                    {conversations.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => openChat(c)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          activeChat?.id === c.id ? "border-[#2563EB] bg-[#eff6ff]" : "border-[#e2e8f0] hover:border-[#2563EB]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-[#1e293b] truncate">{c.name}</p>
                          <span className="text-xs text-[#64748b]">{c.time}</span>
                        </div>
                        <p className="text-sm text-[#64748b] truncate">{c.lastMessage}</p>
                        {c.unread > 0 && (
                          <span className="mt-2 inline-flex items-center justify-center text-xs bg-[#ef4444] text-white rounded-full px-2 py-0.5">
                            {c.unread} new
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="p-4 border-b border-[#e2e8f0]">
                    <p className="font-semibold text-[#1e293b]">
                      {activeChat ? activeChat.name : "Select a conversation"}
                    </p>
                  </div>
                  <div className="flex-1 overflow-auto p-4 space-y-3 bg-[#f8fafc]">
                    {activeChat ? (
                      chatMessages.map((m, idx) => (
                        <div key={idx} className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${
                              m.sender === "me"
                                ? "bg-[#2563EB] text-white"
                                : "bg-white border border-[#e2e8f0] text-[#1e293b]"
                            }`}
                          >
                            <p>{m.content}</p>
                            <p className="mt-1 text-[10px] opacity-70">{m.time}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-[#64748b]">Choose a conversation to start chatting.</p>
                    )}
                  </div>
                  <form className="p-4 flex gap-2 border-t border-[#e2e8f0]" onSubmit={sendMessage}>
                    <TextInput
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <PrimaryButton type="submit">Send</PrimaryButton>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {currentPage === "profile" && (
        <div className="min-h-screen bg-[#f8fafc]">
          <nav className="bg-white shadow-sm border-b border-[#e2e8f0]">
            <div className="max-w-7xl mx-auto px-4 max-sm:px-6">
              <div className="flex justify-between items-center h-16">
                <Logo />
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigateTo("feed")}
                    className="text-[#64748b] hover:text-[#2563EB] transition-colors"
                  >
                    Back to Feed
                  </button>
                  <button
                    onClick={signOut}
                    className="text-[#64748b] hover:text-[#ef4444] transition-colors"
                    title="Sign out"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-4xl mx-auto px-4 max-sm:px-6 py-6">
            <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-6 mb-6">
              <div className="flex items-start gap-6 max-sm:flex-col max-sm:items-center max-sm:text-center">
                <img src={userProfile.avatar} alt="Profile" className="w-24 h-24 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 max-sm:justify-center">
                    <h1 className="text-2xl font-bold text-[#1e293b]">{userProfile.name}</h1>
                    <button
                      onClick={() => setEditingProfile((v) => !v)}
                      className="text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
                      title="Edit profile"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                  </div>
                  <p className="text-[#64748b] mb-1">{userProfile.email}</p>
                  <p className="text-[#64748b] mb-1">{userProfile.university}</p>
                  <p className="text-sm text-[#64748b]">{"Member since " + userProfile.joinDate}</p>
                </div>
              </div>
            </div>

            {editingProfile && (
              <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-6 mb-6">
                <h2 className="text-xl font-bold text-[#1e293b] mb-4">Edit Profile</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Full Name</label>
                    <TextInput
                      value={userProfile.name}
                      onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Email</label>
                    <TextInput
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">University</label>
                    <SelectInput
                      value={userProfile.university}
                      onChange={(e) => setUserProfile({ ...userProfile, university: e.target.value })}
                    >
                      {universities.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </SelectInput>
                  </div>
                  <div className="flex justify-end gap-3">
                    <PrimaryButton variant="outline" onClick={() => setEditingProfile(false)}>
                      Close
                    </PrimaryButton>
                    <PrimaryButton onClick={() => setEditingProfile(false)}>Save</PrimaryButton>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}
