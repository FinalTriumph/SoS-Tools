import { Hero } from '@/types/entities/hero';
import { router } from '@inertiajs/react';
import HeroItem from "./HeroItem";

interface HeroesGridProps {
    heroes: Hero[],
}

export default function HeroesGrid({
    heroes,
}: HeroesGridProps) {
    const handleHeroClick = (id: number): void => {
        router.visit(route('hero.edit', id));
    };

    return (
        <div>
            <hr className="my-6"/>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {heroes.map((hero) => (
                    <HeroItem
                        hero={hero}
                        handleHeroClick={() => handleHeroClick(hero.id)}
                    />
                ))}
            </div>
        </div>
    );
}
