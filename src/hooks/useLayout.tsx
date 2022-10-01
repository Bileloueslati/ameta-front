import create from "zustand";

type Layout = {
  navIsExpanded: boolean;
  expandNav: (val: boolean) => void;
};

const useLayout = create<Layout>((set) => ({
  navIsExpanded: true,
  expandNav: (val) => set((state) => ({ navIsExpanded: val })),
}));

export default useLayout;
