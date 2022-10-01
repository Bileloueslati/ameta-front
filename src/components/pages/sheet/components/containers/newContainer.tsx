import { FunctionComponent } from "react";
import { useSheetContext } from "../../../../../contexts/sheet";
import Modal from "../../../../modal";
import WithModal, { InjectedModalProps } from "../../../../modal/withModal";

const NewContainerModal: FunctionComponent = ({ ...props }) => {
  const modalState = props as InjectedModalProps;

  const sheet = useSheetContext();

  return (
    <Modal title="" buttonProps={{ title: "" }} {...modalState}>
      <div>dksqjkds</div>
    </Modal>
  );
};

export default WithModal(NewContainerModal);
