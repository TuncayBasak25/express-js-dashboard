function editOnClick(context)
{
  if (context.firstElementChild.style.display === 'none')
  {
  //0  context.firstElementChild.style.display = 'inline';
  //  context.lastElementChild.style.display = 'none';
  }
  else
  {
    context.firstElementChild.style.display = 'none';
    context.lastElementChild.style.display = 'inline';
    context.lastElementChild.value = context.firstElementChild.textContent;
    context.lastElementChild.focus();
    context.lastElementChild.select();
  }
}
