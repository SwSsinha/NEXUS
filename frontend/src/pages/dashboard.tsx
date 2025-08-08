import { useState, useMemo } from "react";
import { Sidebar } from "../components/Sidebar";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { useContent } from "../hooks/useContent";
import { Header } from "../components/Header";
import { BACKEND_URL } from "../config";

// The Dashboard component no longer needs to accept the navigate prop.
export function Dashboard() {
    const { contents, loading, error, refresh, deleteContent } = useContent();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState("all");

    // Using a more realistic placeholder for the user object.
    // In a real app, this would come from your auth state.
    const user = useMemo(() => ({ username: "Gemini User" }), []);

    // Memoize the filtered content to avoid unnecessary re-renders
    const filteredContents = useMemo(() => {
        if (activeFilter === "all") {
            return contents;
        }
        return contents.filter(content => content.type === activeFilter);
    }, [contents, activeFilter]);

    return (
        <div className="flex bg-gray-50 min-h-screen">
            {/* Sidebar component with a prop to handle filter changes */}
            <Sidebar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

            <div className="flex-1 ml-72 pt-16 p-8">
                {/* We no longer pass the navigation-related props to the Header,
                    as the Header now uses the `useNavigate` hook directly. */}
                <Header 
                    onAddContentClick={() => setIsModalOpen(true)} 
                    user={user} 
                />

                <main className="mt-8">
                    {loading && <div className="text-center text-gray-500 text-lg">Loading content...</div>}
                    {error && <div className="text-center text-red-500 text-lg">{error}</div>}
                    
                    {!loading && !error && filteredContents.length === 0 && (
                        <div className="text-center text-gray-500 text-lg mt-16">
                            No content found. Click "Add Content" to get started!
                        </div>
                    )}

                    {!loading && !error && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredContents.map((content) => (
                                <Card key={content._id} content={content} deleteContent={deleteContent} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
            
            {/* Modal for creating new content, with refresh function passed as a prop */}
            <CreateContentModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                refreshContent={refresh}
            />
        </div>
    );
}
