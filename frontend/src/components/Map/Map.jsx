import ReactDOM from 'react-dom/client';
import React from 'react';
import { createPortal } from 'react-dom';
import FiltersForm from '../FiltersForm/FiltersForm';
import MapComponent from './MapComponent';
import { DeploymentDataProvider } from '../../context/DeploymentDataContext';
import { FiltersProvider } from '../../context/FiltersContext';
import AppToaster from '../common/AppToaster';

/**
 * Wrapper component that renders the map and filters form into their respective DOM placeholders.
 * Uses React portals to render components into pre-existing DOM elements outside the React tree.
 * Wraps both components with DeploymentDataProvider, which fetches this deployment's
 * fixed data (category definitions and the new-point schema) once for every consumer,
 * and with FiltersProvider, which owns the one thing that changes as the app runs.
 *
 * @returns {React.ReactElement|null} Portals for MapComponent and, when the left panel
 *     is present, FiltersForm - or null if the map placeholder is not found
 */
const MapWrap = () => {
    const mapPlaceholder = document.getElementById('map');
    // Optional: a deployment with no categories to filter by renders no left panel at
    // all (see map.html), so a missing placeholder is a valid configuration rather than
    // an error - the map still has to come up.
    const filtersPlaceholder = document.getElementById('filter-form');

    if (!mapPlaceholder) {
        console.error('Did not find a DOM element to render the map');
        return null;
    }

    return (
        <DeploymentDataProvider>
            <FiltersProvider>
                <AppToaster />
                {filtersPlaceholder && createPortal(<FiltersForm />, filtersPlaceholder)}
                {createPortal(<MapComponent />, mapPlaceholder)}
            </FiltersProvider>
        </DeploymentDataProvider>
    );
};

/**
 * Main entry point for the map application.
 * Creates a root DOM element, initializes React rendering, and mounts the MapWrap component.
 * This function is typically called once during application initialization.
 *
 * @returns {void}
 */
const MapContainer = () => {
    const appContainer = document.createElement('div');
    document.body.appendChild(appContainer);

    const root = ReactDOM.createRoot(appContainer);
    root.render(<MapWrap />);
};

export default MapContainer;
