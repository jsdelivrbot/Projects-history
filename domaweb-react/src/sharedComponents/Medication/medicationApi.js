import request_super from '../../utils/api/request_super';

export const getMedicationDataset = () => request_super('dataset/medication');
export const getMedicationAtcDataset = () => request_super('dataset/atc');
export const getMedicationDatasetId = (vnrId) => request_super(`dataset/medication/${vnrId}`);