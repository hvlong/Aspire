const base_url = 'https://06bc3c76-b73c-4952-b0a5-d5f0da6715d6.mock.pstmn.io'
export async function getUserCardDetails() {
    const url = `${base_url}/v1/users/1/cardinfo`;
      return  fetch(url)
      .then(res => res.json())
      .then(json => {
          return json.data
        })
}


export  async function  getExpenseHistoryFromAPI ()  {
  const url = `${base_url}/v1/users/1/expenseinfo?mon=last_six`;
  return  await fetch(url)
      .then(res => res.json())
      .then(json =>{
          return json.expense_info 
      })
          
    }


export async function getExpenseCategoryFromAPI ()  {
  const url = `${base_url}/v1/users/1/categoryinfo?mon=last_six`;
  return  fetch(url)
      .then(res => res.json())
      .then(json => {
        return json.categories_info
          
    })
  }




