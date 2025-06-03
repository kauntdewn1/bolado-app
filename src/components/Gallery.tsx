import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Member {
  uid: string;
  name: string;
  photoURL?: string;
}

const Gallery: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const users: Member[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          users.push({
            uid: doc.id,
            name: data.name || data.email || 'Membro',
            photoURL: data.photoURL || '',
          });
        });
        setMembers(users);
      } catch (e) {
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  return (
    <section id="membros" className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight">Quem Já Está Bolado</h2>
        <div className="flex justify-center">
          {loading ? (
            <div className="text-gray-400 text-lg animate-pulse">Carregando membros...</div>
          ) : members.length === 0 ? (
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-60 flex items-center justify-center animate-pulse">
                <span className="text-4xl">🦁</span>
              </div>
              <span className="text-gray-400 text-lg">Seja o primeiro a entrar para o clube!</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 w-full max-w-5xl mx-auto">
              {members.map((member) => (
                <div key={member.uid} className="flex flex-col items-center group transition-transform duration-300 hover:scale-105">
                  <div className="relative mb-2">
                    <img
                      src={member.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name)}
                      alt={member.name}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white shadow-lg group-hover:ring-4 group-hover:ring-purple-400 transition-all duration-300"
                    />
                  </div>
                  <span className="text-base font-medium text-white group-hover:text-purple-300 transition-colors duration-300 truncate w-24 text-center">{member.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-16 text-center">
          <span className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg animate-fade-in">Junte-se à comunidade e seja bolado também!</span>
        </div>
      </div>
    </section>
  );
};

export default Gallery;