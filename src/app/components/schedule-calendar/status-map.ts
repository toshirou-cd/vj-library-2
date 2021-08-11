import { SemanticCOLORS } from 'semantic-ui-react';

export interface StatusMap {
  [status: number]: {
    color: SemanticCOLORS;
    label: string;
  };
}
