import Navbar from '../Navbar';

export default function NavbarExample() {
  // todo: remove mock functionality
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
  };

  return (
    <Navbar 
      user={mockUser} 
      onLogout={() => console.log('Logout clicked')} 
    />
  );
}
