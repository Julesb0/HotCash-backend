import React, { useState, useEffect } from 'react';
import { getJson, postJson } from '../api/client';
import './ProfilePage.css';

interface Profile {
  id: string;
  email: string;
  username: string;
  fullName?: string;
  bio?: string;
  companyName?: string;
  industry?: string;
  website?: string;
  linkedinUrl?: string;
  location?: string;
  avatarUrl?: string;
  phone?: string;
  birthDate?: string;
  experienceLevel?: string;
  skills?: string[];
  interests?: string[];
  isMentor?: boolean;
  isInvestor?: boolean;
  yearsExperience?: number;
  companyStage?: string;
  fundingStage?: string;
  teamSize?: number;
  revenueRange?: string;
  lookingFor?: string[];
}

function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Profile>({} as Profile);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getJson('/api/profile/me');
      setProfile(data);
      setFormData(data);
    } catch (err) {
      setError('Error al cargar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleArrayChange = (name: string, value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({
      ...prev,
      [name]: items
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await postJson('/api/profile/me', formData);
      setProfile(response);
      setEditing(false);
      setSuccess('Perfil actualizado exitosamente');
    } catch (err) {
      setError('Error al actualizar el perfil');
    }
  };

  if (loading) {
    return <div className="container"><div className="loading">Cargando perfil...</div></div>;
  }

  if (!profile) {
    return <div className="container"><div className="error">Perfil no encontrado</div></div>;
  }

  return (
    <div className="container">
      <div className="profile-container">
        <div className="profile-header">
          <h1>Mi Perfil</h1>
          {!editing && (
            <button className="btn btn-primary" onClick={() => setEditing(true)}>
              Editar Perfil
            </button>
          )}
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {editing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-section">
              <h3>Información Personal</h3>
              <div className="form-group">
                <label>Nombre Completo</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName || ''}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Biografía</label>
                <textarea
                  name="bio"
                  value={formData.bio || ''}
                  onChange={handleInputChange}
                  className="form-control"
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>Fecha de Nacimiento</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate || ''}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Ubicación</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location || ''}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Información Profesional</h3>
              <div className="form-group">
                <label>Empresa</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName || ''}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Industria</label>
                <select
                  name="industry"
                  value={formData.industry || ''}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="">Seleccionar industria</option>
                  <option value="technology">Tecnología</option>
                  <option value="healthcare">Salud</option>
                  <option value="finance">Finanzas</option>
                  <option value="education">Educación</option>
                  <option value="retail">Retail</option>
                  <option value="food">Alimentos</option>
                  <option value="other">Otro</option>
                </select>
              </div>
              <div className="form-group">
                <label>Sitio Web</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website || ''}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>LinkedIn</label>
                <input
                  type="url"
                  name="linkedinUrl"
                  value={formData.linkedinUrl || ''}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Nivel de Experiencia</label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel || ''}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="">Seleccionar nivel</option>
                  <option value="beginner">Principiante</option>
                  <option value="intermediate">Intermedio</option>
                  <option value="advanced">Avanzado</option>
                  <option value="expert">Experto</option>
                </select>
              </div>
              <div className="form-group">
                <label>Años de Experiencia</label>
                <input
                  type="number"
                  name="yearsExperience"
                  value={formData.yearsExperience || 0}
                  onChange={handleInputChange}
                  className="form-control"
                  min="0"
                  max="50"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Habilidades e Intereses</h3>
              <div className="form-group">
                <label>Habilidades (separadas por comas)</label>
                <input
                  type="text"
                  name="skills"
                  value={(formData.skills || []).join(', ')}
                  onChange={(e) => handleArrayChange('skills', e.target.value)}
                  className="form-control"
                  placeholder="JavaScript, React, Node.js, Python"
                />
              </div>
              <div className="form-group">
                <label>Intereses (separados por comas)</label>
                <input
                  type="text"
                  name="interests"
                  value={(formData.interests || []).join(', ')}
                  onChange={(e) => handleArrayChange('interests', e.target.value)}
                  className="form-control"
                  placeholder="Inteligencia Artificial, Blockchain, Finanzas"
                />
              </div>
              <div className="form-group">
                <label>¿Qué estás buscando? (separado por comas)</label>
                <input
                  type="text"
                  name="lookingFor"
                  value={(formData.lookingFor || []).join(', ')}
                  onChange={(e) => handleArrayChange('lookingFor', e.target.value)}
                  className="form-control"
                  placeholder="Cofundador, Inversión, Mentoría"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Información de la Empresa</h3>
              <div className="form-group">
                <label>Etapa de la Empresa</label>
                <select
                  name="companyStage"
                  value={formData.companyStage || ''}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="">Seleccionar etapa</option>
                  <option value="idea">Idea</option>
                  <option value="development">Desarrollo</option>
                  <option value="mvp">MVP</option>
                  <option value="launch">Lanzamiento</option>
                  <option value="growth">Crecimiento</option>
                  <option value="established">Establecida</option>
                </select>
              </div>
              <div className="form-group">
                <label>Etapa de Financiamiento</label>
                <select
                  name="fundingStage"
                  value={formData.fundingStage || ''}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="">Seleccionar etapa</option>
                  <option value="bootstrapped">Bootstrapped</option>
                  <option value="pre-seed">Pre-Seed</option>
                  <option value="seed">Seed</option>
                  <option value="series-a">Serie A</option>
                  <option value="series-b">Serie B</option>
                  <option value="series-c">Serie C+</option>
                </select>
              </div>
              <div className="form-group">
                <label>Tamaño del Equipo</label>
                <input
                  type="number"
                  name="teamSize"
                  value={formData.teamSize || 1}
                  onChange={handleInputChange}
                  className="form-control"
                  min="1"
                  max="1000"
                />
              </div>
              <div className="form-group">
                <label>Rango de Ingresos</label>
                <select
                  name="revenueRange"
                  value={formData.revenueRange || ''}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="">Seleccionar rango</option>
                  <option value="0">$0 (Sin ingresos)</option>
                  <option value="1-10k">$1 - $10K</option>
                  <option value="10k-100k">$10K - $100K</option>
                  <option value="100k-1m">$100K - $1M</option>
                  <option value="1m-10m">$1M - $10M</option>
                  <option value="10m+">$10M+</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <h3>Roles</h3>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="isMentor"
                    checked={formData.isMentor || false}
                    onChange={handleCheckboxChange}
                  />
                  Soy Mentor
                </label>
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="isInvestor"
                    checked={formData.isInvestor || false}
                    onChange={handleCheckboxChange}
                  />
                  Soy Inversor
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Guardar Cambios
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => {
                setEditing(false);
                setFormData(profile || {} as Profile);
              }}>
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-view">
            <div className="profile-section">
              <h3>Información Personal</h3>
              <div className="profile-field">
                <strong>Nombre Completo:</strong> {profile.fullName || 'No especificado'}
              </div>
              <div className="profile-field">
                <strong>Biografía:</strong> {profile.bio || 'No especificada'}
              </div>
              <div className="profile-field">
                <strong>Ubicación:</strong> {profile.location || 'No especificada'}
              </div>
              <div className="profile-field">
                <strong>Teléfono:</strong> {profile.phone || 'No especificado'}
              </div>
              <div className="profile-field">
                <strong>Nivel de Experiencia:</strong> {profile.experienceLevel || 'No especificado'}
              </div>
              <div className="profile-field">
                <strong>Años de Experiencia:</strong> {profile.yearsExperience || 0}
              </div>
            </div>

            <div className="profile-section">
              <h3>Información Profesional</h3>
              <div className="profile-field">
                <strong>Empresa:</strong> {profile.companyName || 'No especificada'}
              </div>
              <div className="profile-field">
                <strong>Industria:</strong> {profile.industry || 'No especificada'}
              </div>
              <div className="profile-field">
                <strong>Sitio Web:</strong> {profile.website ? <a href={profile.website} target="_blank" rel="noopener noreferrer">{profile.website}</a> : 'No especificado'}
              </div>
              <div className="profile-field">
                <strong>LinkedIn:</strong> {profile.linkedinUrl ? <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">Ver perfil</a> : 'No especificado'}
              </div>
            </div>

            <div className="profile-section">
              <h3>Habilidades e Intereses</h3>
              <div className="profile-field">
                <strong>Habilidades:</strong>
                <div className="tags">
                  {(profile.skills || []).map((skill, index) => (
                    <span key={index} className="tag">{skill}</span>
                  ))}
                  {(profile.skills || []).length === 0 && 'No especificadas'}
                </div>
              </div>
              <div className="profile-field">
                <strong>Intereses:</strong>
                <div className="tags">
                  {(profile.interests || []).map((interest, index) => (
                    <span key={index} className="tag">{interest}</span>
                  ))}
                  {(profile.interests || []).length === 0 && 'No especificados'}
                </div>
              </div>
              <div className="profile-field">
                <strong>Buscando:</strong>
                <div className="tags">
                  {(profile.lookingFor || []).map((item, index) => (
                    <span key={index} className="tag">{item}</span>
                  ))}
                  {(profile.lookingFor || []).length === 0 && 'No especificado'}
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3>Información de la Empresa</h3>
              <div className="profile-field">
                <strong>Etapa de la Empresa:</strong> {profile.companyStage || 'No especificada'}
              </div>
              <div className="profile-field">
                <strong>Etapa de Financiamiento:</strong> {profile.fundingStage || 'No especificada'}
              </div>
              <div className="profile-field">
                <strong>Tamaño del Equipo:</strong> {profile.teamSize || 1}
              </div>
              <div className="profile-field">
                <strong>Rango de Ingresos:</strong> {profile.revenueRange || 'No especificado'}
              </div>
            </div>

            <div className="profile-section">
              <h3>Roles</h3>
              <div className="profile-field">
                <strong>Mentor:</strong> {profile.isMentor ? 'Sí' : 'No'}
              </div>
              <div className="profile-field">
                <strong>Inversor:</strong> {profile.isInvestor ? 'Sí' : 'No'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;