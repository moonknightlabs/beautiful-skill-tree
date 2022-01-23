import * as React from 'react';
import {
  NodeState,
  ContextStorage,
  SavedDataType,
  SkillData,
  NodeSelectEvent,
  Skill,
} from '../models';
import { IAppContext } from './AppContext';
declare type Props = typeof SkillTreeProvider.defaultProps & {
  treeId: string;
  savedData?: SavedDataType;
  storage?: ContextStorage;
};
declare type DefaultProps = {
  handleSave: (
    storage: ContextStorage,
    id: string,
    skills: SavedDataType
  ) => void;
  sendNodeSelectDataToClient: (e: NodeSelectEvent) => void;
};
interface State {
  skills: SavedDataType;
  skillCount: number;
  selectedCount: number;
  resetId: string;
  mounting: boolean;
}
export interface ISkillContext {
  mounting: boolean;
  skills: SavedDataType;
  skillCount: number;
  selectedCount: number;
  updateSkillState: (
    key: string,
    updatedState: NodeState,
    optional?: boolean
  ) => void;
  setSkillCount: (skillCount: number) => void;
  handleNodeSelect: (
    key: string,
    state: NodeState,
    skill: Skill,
    learned: number
  ) => void;
  incrementSelectedCount: VoidFunction;
  decrementSelectedCount: VoidFunction;
}
declare const SkillContext: React.Context<ISkillContext>;
export declare class SkillTreeProvider extends React.Component<Props, State> {
  static contextType: React.Context<IAppContext>;
  static defaultProps: DefaultProps;
  storage: ContextStorage | null;
  constructor(props: Props, context: IAppContext);
  componentDidMount(): null;
  getTreeSkills: () => import('../models/utils').Dictionary<SkillData>;
  componentDidUpdate(): void;
  incrementSelectedCount: (optional?: boolean) => void;
  decrementSelectedCount: (optional?: boolean) => void;
  resetSkills: () => void;
  setSkillCount: (skillCount: number) => void;
  handleNodeSelect: (
    key: string,
    state: NodeState,
    skill: Skill,
    learned: number
  ) => void;
  updateSkillState: (
    key: string,
    updatedState: NodeState,
    optional?: boolean
  ) => void;
  render(): JSX.Element;
}
export default SkillContext;
