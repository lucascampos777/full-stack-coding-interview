export default function PhotosLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen px-3 bg-white">
            {children}
        </div>
    );
}