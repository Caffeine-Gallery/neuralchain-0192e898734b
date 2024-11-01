export const idlFactory = ({ IDL }) => {
  return IDL.Service({ 'deployModel' : IDL.Func([], [IDL.Text], []) });
};
export const init = ({ IDL }) => { return []; };
