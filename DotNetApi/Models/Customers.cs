namespace WjwApi.Models
{
    public partial class Customer
    {
        public int CustomerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }

        public Customer()
        {
            if (this.FirstName == null)
            {
                this.FirstName = " ";
            }
            if (this.LastName == null)
            {
                this.LastName = " ";
            }
            if (this.Email == null)
            {
                this.Email = " ";
            }
            if (this.Phone == null)
            {
                this.Phone = " ";
            }
        }
    }
}