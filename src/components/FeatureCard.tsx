import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    title: string;
    description: string;
    Icon: LucideIcon;
}

export function FeatureCard({ title, description, Icon }: FeatureCardProps) {
    return (
        <div className="feature-card">
            <div className="feature-icon-wrapper">
                <Icon size={28} />
            </div>
            <h3 className="feature-title">{title}</h3>
            <p className="feature-desc">{description}</p>
        </div>
    );
}
