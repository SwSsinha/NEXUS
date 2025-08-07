import { useState, useMemo } from "react";
import { Sidebar } from "../components/Sidebar";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { useContent } from "../hooks/useContent";
import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { BACKEND_URL } from "../config";

// A simple header component for the dashboard
function Header({ onAddContentClick }: { onAddContentClick: () => void }) {
    return (
        <header className="fixed top-0 left-72 right-0 bg-white shadow-sm h-16 flex items-center justify-between px-8 z-40">
            <h1 className="text-xl font-bold text-gray-800">Your Content Dashboard</h1>
            <Button
                variant="primary"
                text="Add Content"
                startIcon={<PlusIcon />}
                onClick={onAddContentClick}
            />
        </header>
    );
}

export function Dashboard() {
    const { contents, loading, error, refresh, deleteContent } = useContent();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState("all");

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
                {/* Header with the add content button */}
                <Header onAddContentClick={() => setIsModalOpen(true)} />

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
