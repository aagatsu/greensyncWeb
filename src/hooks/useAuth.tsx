// hooks/useAuth.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signOut 
} from 'firebase/auth';
import { ref, get, update } from 'firebase/database';
import { auth, database } from '../services/firebase';

interface AuthContextType {
  usuario: User | null;
  usuarioData: any;
  carregando: boolean;
  logout: () => Promise<void>;
  atualizarPerfil: (dados: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [usuarioData, setUsuarioData] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUsuario(user);
      
      if (user) {
        // Buscar dados adicionais do usuário
        try {
          const userRef = ref(database, `usuarios/${user.uid}`);
          const snapshot = await get(userRef);
          
          if (snapshot.exists()) {
            setUsuarioData(snapshot.val());
          } else {
            // Criar dados básicos se não existirem
            const dadosBasicos = {
              nome: user.displayName || user.email?.split('@')[0] || 'Usuário',
              email: user.email,
              dataCriacao: new Date().toISOString(),
              ultimoLogin: new Date().toISOString()
            };
            setUsuarioData(dadosBasicos);
          }
        } catch (error) {
          console.error('Erro ao carregar dados do usuário:', error);
        }
      } else {
        setUsuarioData(null);
      }
      
      setCarregando(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUsuario(null);
      setUsuarioData(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  };

  const atualizarPerfil = async (dados: any) => {
    if (!usuario) throw new Error('Nenhum usuário logado');
    
    try {
      const userRef = ref(database, `usuarios/${usuario.uid}`);
      await update(userRef, {
        ...dados,
        ultimaAtualizacao: new Date().toISOString()
      });
      
      setUsuarioData((prev: any) => ({ ...prev, ...dados }));
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      usuario, 
      usuarioData, 
      carregando, 
      logout, 
      atualizarPerfil 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}