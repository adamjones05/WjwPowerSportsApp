namespace WjwApi.Models
{
    public partial class Customer
    {
        public int customerId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string phone { get; set; }

        public Customer()
        {
            if (this.firstName == null)
            {
                this.firstName = " ";
            }
            if (this.lastName == null)
            {
                this.lastName = " ";
            }
            if (this.email == null)
            {
                this.email = " ";
            }
            if (this.phone == null)
            {
                this.phone = " ";
            }
        }
    }
}