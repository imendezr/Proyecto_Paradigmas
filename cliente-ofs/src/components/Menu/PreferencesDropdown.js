function PreferencesDropdown({ preferences, updatePreference }) {
  return (
    <div className="preferencesDropdown">
      <label>
        <input 
          type="checkbox" 
          checked={preferences.theme === 'dark'} 
          onChange={(e) => updatePreference('theme', e.target.checked ? 'dark' : 'light')} 
        />
        Tema oscuro
      </label>
      {/* Aquí se agregan más controles de preferencias */}
    </div>
  );
}

export default PreferencesDropdown;
