import {
  RecommendoorContract_InteractData_handler,
  RecommendoorContract_InteractData_loader,
  RecommendoorContract_UploadData_handler,
  RecommendoorContract_UploadData_loader,
} from "../generated/src/Handlers.gen";

RecommendoorContract_UploadData_loader(({ event, context }) => {
  context.UploadData.load(event.params.user);
});

RecommendoorContract_UploadData_handler(({ event, context }) => {
  context.UploadData.set({
    user: event.params.user,
    ipfsHash: event.params.ipfsHash,
    channel: event.params.channel,
    id: event.transactionHash,
  });
});

RecommendoorContract_InteractData_loader(({ event, context }) => {
  context.InteractData.load(event.params.user);
});

RecommendoorContract_InteractData_handler(({ event, context }) => {
  context.InteractData.set({
    user: event.params.user,
    ipfsHash: event.params.ipfsHash,
    action: event.params.action,
    id: event.transactionHash,
  });
});
