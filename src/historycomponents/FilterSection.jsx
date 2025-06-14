import React from 'react';
import { useTranslation } from 'react-i18next';
import './FilterSection.css';

const FilterSection = ({ filters, onFilterChange, onApplyFilters, isLoading }) => {
  const { t, i18n } = useTranslation();
  
  // Debug log
  console.log('FilterSection language:', i18n.language, 'applyFilters:', t('applyFilters'));
  
  // Get crops and states from translations
  const crops = Object.keys(t('crops', { returnObjects: true }));
  const states = Object.keys(t('states', { returnObjects: true }));
  const years = Array.from({ length: 52 }, (_, i) => (1966 + i).toString());

  return (
    <section className="filter-section">
      <div className="filter-container">
        <div className="filter-group">
          <label htmlFor="primaryCrop">{t('primaryCrop')}</label>
          <select
            id="primaryCrop"
            value={filters.primaryCrop}
            onChange={(e) => onFilterChange('primaryCrop', e.target.value)}
            disabled={isLoading}
          >
            <option value="">{t('selectPrimaryCrop')}</option>
            {crops.map(crop => (
              <option key={crop} value={crop} disabled={crop === filters.secondaryCrop}>
                {t(`crops.${crop}`)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="secondaryCrop">{t('secondaryCrop')}</label>
          <select
            id="secondaryCrop"
            value={filters.secondaryCrop}
            onChange={(e) => onFilterChange('secondaryCrop', e.target.value)}
            disabled={isLoading}
          >
            <option value="">{t('selectSecondaryCrop')}</option>
            {crops.map(crop => (
              <option key={crop} value={crop} disabled={crop === filters.primaryCrop}>
                {t(`crops.${crop}`)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="state">{t('state')}</label>
          <select
            id="state"
            value={filters.state}
            onChange={(e) => onFilterChange('state', e.target.value)}
            disabled={isLoading}
          >
            <option value="">{t('selectState')}</option>
            {states.map(state => (
              <option key={state} value={state}>{t(`states.${state}`)}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="year">{t('year')}</label>
          <select
            id="year"
            value={filters.year}
            onChange={(e) => onFilterChange('year', e.target.value)}
            disabled={isLoading}
          >
            <option value="">{t('selectYear')}</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <button 
          className="apply-button"
          onClick={onApplyFilters}
          disabled={!filters.primaryCrop || !filters.secondaryCrop || !filters.state || !filters.year || isLoading}
        >
          {isLoading ? t('loading') : t('applyFilters')}
        </button>
      </div>
    </section>
  );
};

export default FilterSection; 