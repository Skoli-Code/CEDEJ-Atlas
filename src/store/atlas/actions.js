export const RENDER = 'map/render/start';
export const RENDER_SUCCESS = 'map/render/success';
export const RENDER_FAIL = 'map/render/fail';

export const RENDER_DOWNLOADABLE = 'map/render/downloadable';
export const RENDER_DOWNLOADABLE_SUCCESS = 'map/render/downloadable/success';
export const RENDER_DOWNLOADABLE_FAIL = 'map/render/downloadable/fail';

export const SHOW_CONTEXTUAL_INFO = 'map/legend/show_info';
export const HIDE_CONTEXTUAL_INFO = 'map/legend/hide_info';

export const DOWNLOAD_MAP = 'map/download';
export const DOWNLOAD_MAP_SUCCESS = 'map/download/success';
export const DOWNLOAD_MAP_FAIL = 'map/download/fail';

export const ZOOM = 'map/zoom/end';


export const zoom = () => ({
  type: ZOOM,
});

export const canvasRendered = (url) => {
  return {
    type: RENDER_DOWNLOADABLE_SUCCESS,
    url,
  };
};

export const createRenderMapRequest = (data, resolve, reject) => {
  return {
    type: RENDER_DOWNLOADABLE,
    ...data,
    resolve,
    reject,
  };
};

export const mapRenderFailure = (error) => ({
  type: RENDER_FAIL,
  error,
});

export const startRender = () => ({ type: RENDER });

export const renderSuccess = () => ({ type: RENDER_SUCCESS });

export const downloadMap = (data, resolve, reject) => ({
  type: DOWNLOAD_MAP,
  ...data,
  resolve,
  reject,
});

export const mapDownloadSuccess = (data) => ({
  type: DOWNLOAD_MAP_SUCCESS,
  ...data,
});

export const mapDownloadFailure = (error) => ({
  type: DOWNLOAD_MAP_FAIL,
  error,
});

export const showContextualInfo = (data) => ({
  type: SHOW_CONTEXTUAL_INFO,
  data,
});

export const hideContextualInfo = () => ({
  type: HIDE_CONTEXTUAL_INFO,
});

