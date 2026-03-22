import './Team.css';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Manjeet Kumar',
      role: 'BCA Sem 2 Student',
      bio: 'Yogoda Satsang Mahavidyalaya student working on AI-driven chemistry UX.'
    },
    {
      id: 2,
      name: 'Trisha Kumari',
      role: 'BCA Sem 2 Student',
      bio: 'Yogoda Satsang Mahavidyalaya student working on data visualization and front-end design.'
    },
    {
      id: 3,
      name: 'Ashutosh Kumar',
      role: 'BCA Sem 2 Student',
      bio: 'Yogoda Satsang Mahavidyalaya student working on model integration and backend logic.'
    },
    {
      id: 4,
      name: 'Utam Kumar',
      role: 'BCA Sem 2 Student',
      bio: 'Yogoda Satsang Mahavidyalaya student focusing on UI/UX and responsive dashboard.'
    }
  ];

  return (
    <div className="team fade-in">
      <div className="hero-section">
        <h1>Our Team</h1>
        <p className="subtitle">Dedicated to advancing drug safety through AI</p>
      </div>

      <div className="team-grid">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-card card">
            <div className="avatar">{member.name.charAt(0)}</div>
            <h2>{member.name}</h2>
            <p className="role">{member.role}</p>
            <p className="bio">{member.bio}</p>
          </div>
        ))}
      </div>

      <div className="card collaboration-section">
        <h2>Collaboration & Support</h2>
        <p>
          This project is inspired by Banaras Hindu University's commitment to research excellence 
          and innovation in pharmaceutical sciences. We collaborate with leading institutions in 
          computational toxicology.
        </p>
      </div>
    </div>
  );
};

export default Team;