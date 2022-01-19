import React from 'react';
import {
  Skill,
  SavedDataType,
  ContextStorage,
  NodeSelectEvent,
} from '../models';
export interface Props {
  treeId: string;
  data: Skill[];
  title: React.ReactNode | string;
  description?: string;
  collapsible?: boolean;
  closedByDefault?: boolean;
  savedData?: SavedDataType;
  disabled?: boolean;
  currentLevel: string | number;
  handleSave?: (
    storage: ContextStorage,
    treeId: string,
    skills: SavedDataType
  ) => void;
  handleNodeSelect?: (e: NodeSelectEvent) => void;
}
declare function SkillTree({
  data,
  title,
  description,
  closedByDefault,
  currentLevel,
  treeId,
  savedData,
  handleSave,
  handleNodeSelect,
  collapsible,
  disabled,
}: Props): JSX.Element;
export default SkillTree;
