import { useState, useMemo } from "react";
import { Sidebar } from "../components/Sidebar";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { SearchBar } from "../components/SearchBar";
import { useContent } from "../hooks/useContent";
import { Header } from "../components/Header";

// The Dashboard component no longer needs to accept the navigate prop.
export function Dashboard() {
    const { contents, loading, error, refresh, deleteContent } = useContent();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    // Memoize the filtered content to avoid unnecessary re-renders
    const filteredContents = useMemo(() => {
        let filtered = contents;

        // Apply type filter
        if (activeFilter !== "all") {
            filtered = filtered.filter(content => content.type === activeFilter);
        }

        // Apply search filter
        if (searchTerm.trim()) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(content => 
                content.title.toLowerCase().includes(searchLower) ||
                content.description.toLowerCase().includes(searchLower) ||
                content.tags.some(tag => tag.toLowerCase().includes(searchLower))
            );
        }

        return filtered;
    }, [contents, activeFilter, searchTerm]);

    const clearSearch = () => {
        setSearchTerm("");
    };

    return (
        <div className="flex bg-gray-50 min-h-screen">
            {/* Sidebar component with a prop to handle filter changes */}
            <Sidebar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

            <div className="flex-1 lg:ml-72 pt-16 p-8">
                {/* Header component no longer needs user prop */}
                <Header 
                    onAddContentClick={() => setIsModalOpen(true)} 
                />

                <main className="mt-8">
                    {/* Search and Stats Section */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                            <div className="flex-1 max-w-md">
                                <SearchBar 
                                    searchTerm={searchTerm}
                                    onSearchChange={setSearchTerm}
                                    placeholder="Search by title, description, or tags..."
                                />
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>{filteredContents.length} of {contents.length} items</span>
                                {searchTerm && (
                                    <button
                                        onClick={clearSearch}
                                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                                    >
                                        Clear search
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {loading && (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading your content...</p>
                        </div>
                    )}
                    
                    {error && (
                        <div className="text-center py-12">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
                                <p className="text-red-800">{error}</p>
                                <button
                                    onClick={refresh}
                                    className="mt-2 text-red-600 hover:text-red-800 font-medium"
                                >
                                    Try again
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {!loading && !error && filteredContents.length === 0 && (
                        <div className="text-center py-12">
                            {searchTerm ? (
                                <div>
                                    <p className="text-gray-500 text-lg mb-4">
                                        No content found matching "{searchTerm}"
                                    </p>
                                    <button
                                        onClick={clearSearch}
                                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                                    >
                                        Clear search and show all content
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No content yet</h3>
                                    <p className="text-gray-500 mb-6">
                                        Start building your second brain by adding your first piece of content.
                                    </p>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                                    >
                                        Add Your First Content
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {!loading && !error && filteredContents.length > 0 && (
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
