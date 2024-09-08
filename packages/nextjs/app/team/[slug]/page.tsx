"use client";

// app/team/[slug]/page.tsx
import { useState } from "react";
import CreateBet from "~~/components/CreateBet/page";
import { fanTokenMapping } from "~~/components/fantokens/metadata";

type TeamPageProps = {
  params: {
    slug: string;
  };
};

const slugToTeamname = (slug: string): string => {
  return fanTokenMapping.hasOwnProperty(slug) ? fanTokenMapping[slug] : "";
};

const TeamPage: React.FC<TeamPageProps> = ({ params }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log("opening createbet");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("closing  createbet");
    setIsModalOpen(false);
  };

  const { slug } = params;
  console.log("########### slug: ", slug);
  const teamName = slugToTeamname(slug);

  return (
    <>
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">{teamName} Fan Token Page</h2>
          <p className="text-gray-700 mb-8">
            Stay updated with the latest news, scores, and make bets against your RIVALZ using your {slug} fan tokens.
          </p>
          {/* <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"> */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={openModal}>
            Place ANY custom bet on {teamName} beating your RIVALZ!
          </button>
          <CreateBet isOpen={isModalOpen} onClose={closeModal} />
        </div>
      </section>
    </>
  );
};

export default TeamPage;
