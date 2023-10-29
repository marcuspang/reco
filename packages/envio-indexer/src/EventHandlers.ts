import {
  RecommendoorContract_InteractData_handler,
  RecommendoorContract_InteractData_loader,
  RecommendoorContract_UploadData_handler,
  RecommendoorContract_UploadData_loader,
} from "../generated/src/Handlers.gen";

RecommendoorContract_UploadData_loader(({ event, context }) => {
  context.UploadData.load(event.params._0);
});

RecommendoorContract_UploadData_handler(({ event, context }) => {
  context.UploadData.set({
    user: event.params._0,
    ipfsHash: event.params._1,
    channel: event.params._2,
    id: event.transactionHash,
  });
});

RecommendoorContract_InteractData_loader(({ event, context }) => {
  context.InteractData.load(event.params._0);
});

RecommendoorContract_InteractData_handler(({ event, context }) => {
  context.InteractData.set({
    user: event.params._0,
    ipfsHash: event.params._1,
    action: event.params._2,
    id: event.transactionHash,
  });
});
