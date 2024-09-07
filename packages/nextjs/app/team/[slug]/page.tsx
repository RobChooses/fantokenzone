// app/team/[slug]/page.tsx
type TeamPageProps = {
  params: {
    slug: string;
  };
};

const TeamPage: React.FC<TeamPageProps> = ({ params }) => {
  const { slug } = params;
  console.log("########### slug: ", slug);
  // const teamData = use(fetchTeamData(slug));

  return (
    <>
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">{slug} Fan Token Page</h2>
          <p className="text-gray-700 mb-8">
            Stay updated with the latest news, scores, and make bets against your RIVALZ using your {slug} fan tokens.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Join the Community</button>
        </div>
      </section>
    </>
  );
};

export default TeamPage;
