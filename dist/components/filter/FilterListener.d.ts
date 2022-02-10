interface Props {
    setVisibility: (isVisible: boolean) => void;
    isVisible: boolean;
    treeId: string;
    disabled: boolean;
}
declare function FilterListener({ setVisibility, isVisible, treeId, disabled }: Props): null;
export default FilterListener;
