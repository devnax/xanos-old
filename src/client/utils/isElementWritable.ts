const isElementWritable = (element: any) => {
  return (
    (element.tagName.toLowerCase() === 'input' ||
      element.tagName.toLowerCase() === 'textarea' ||
      element.isContentEditable) &&
    !element.disabled
  );
}


export default isElementWritable