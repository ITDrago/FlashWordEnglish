﻿
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Model
{
    public class User
    {
        [Key]
        public int ID { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public ICollection<Word> Words { get; set; }
    }
}
