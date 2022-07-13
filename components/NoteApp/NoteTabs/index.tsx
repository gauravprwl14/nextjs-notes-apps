import { FunctionComponent } from "react";
import { FilterTab } from "../../../types/note";

interface Props {
  activeTab: FilterTab;
  changeActiveTab: (tab: FilterTab) => void;
}

const TodoTabs: FunctionComponent<Props> = ({ activeTab, changeActiveTab }) => {
  return (
    <div className="w-1/3 h-12 text-center divide-x bg-white rounded-md mx-auto mt-6 flex">
      <div className={"flex-1"}>
        <button
          disabled={activeTab == "all"}
          onClick={() => changeActiveTab("all")}
          className="disabled:bg-slate-400 disabled:text-white rounded-md h-full w-full"
        >
          All
        </button>
      </div>
      <div className="flex-1">
        <button
          disabled={activeTab == "active"}
          onClick={() => changeActiveTab("active")}
          className="disabled:bg-slate-400 disabled:text-white rounded-md h-full w-full"
        >
          Active
        </button>
      </div>
      <div className="flex-1">
        <button
          disabled={activeTab == "completed"}
          onClick={() => changeActiveTab("completed")}
          className="disabled:bg-slate-400 disabled:text-white rounded-md h-full w-full"
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoTabs;
